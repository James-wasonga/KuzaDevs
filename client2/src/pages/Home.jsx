import React, { useState, useEffect } from 'react'

import { DisplayCampaigns } from '../components';
import { useStateContext } from '../context'
import { getCampaigns, contract } from '../utils/web3Utils';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address } = useStateContext();


  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    
    setCampaigns(data);
    setIsLoading(false);
  }

  console.log(campaigns)

  useEffect(() => {
    if(contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <DisplayCampaigns 
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  )
}

export default Home