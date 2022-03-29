import { ethers } from "ethers";
import Counter from "../artifacts/contracts/Counter.sol/Counter.json";

function getEth() {
  // @ts-ignore
  const eth = window.ethereum;
  if (!eth) throw new Error("get metamask and a positive attitude");

  return eth;
}

async function hasAccounts() {
  const eth = getEth();
  const accounts = (await eth.request({ method: "eth_accounts" })) as String[];

  return accounts && accounts.length;
}

async function requestAccount() {
  const eth = getEth();
  const accounts = (await eth.request({
    method: "eth_requestAccounts",
  })) as String[];

  return accounts && accounts.length;
}

async function run() {
  if (!(await hasAccounts()) && !(await requestAccount())) {
    throw new Error("Please let me take your money");
  }

  const counter = new ethers.Contract(
    process.env.CONTRACT_ADDRESS,
    Counter.abi,
    new ethers.providers.Web3Provider(getEth()).getSigner()
  );

  const el = document.createElement("div");
  async function setCounter(count?) {
    el.innerHTML = count || (await counter.getCounter());
  }

  setCounter();

  const button = document.createElement("button");
  button.innerText = "increment";
  button.onclick = async () => {
    await counter.count();
  };

  counter.on(counter.filters.CounterInc(), (count) => {
    setCounter(count);
  });

  document.body.appendChild(el);
  document.body.appendChild(button);
}

run();
