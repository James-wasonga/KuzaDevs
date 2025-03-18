import { ethers } from "ethers";
import { abi } from "./abi";

const provider = new ethers.providers.Web3Provider(window.ethereum);

const contractAddres = "0x4800d0575d8b73790F183D1Ae3288Cd6489e2Ade";
export const contract = new ethers.Contract(contractAddres, abi, provider);

export async function getInformationCount() {
  const count = await contract.digitalInformationCount();
  console.log(count.toString());
}

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      provider.send("eth_requestAccounts", []);
    } catch (error) {
      console.error("wallet connection failed ", error);
    }
  } else {
    alert("metamask not found please install it");
  }
};

export const createCampaign = async (title, description, target, deadline, image) => {
    if (!window.ethereum) {
        console.error("metamask not installed");
        return;
      }
    
      try {
        // Create a contract instance connected to the signer
        const signer = provider.getSigner();
    
        const contract = new ethers.Contract(contractAddres, abi, signer);
        const tx = await contract.createCampaign(
          title, description, target, deadline, image
        );
        console.log(`transaction sent ${tx.hash}`);
        await tx.wait();
        console.log("transaction confirmed");
      } catch (error) {
        console.log("transaction failed", error);
      }
}

export const getCampaigns = async () => {

    const dummy_campaigns = [];
   
    const campaigns = await contract.getCampaigns();

    campaigns.forEach(campaign => {
        dummy_campaigns.push(Object.assign({}, campaign))
    });
    console.log(dummy_campaigns)
    return dummy_campaigns;

}

export const getDonations = async (pId) => {
    const donations = await contract.call('getDonators', [pId]);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for(let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString())
      })
    }

    return parsedDonations;
  }