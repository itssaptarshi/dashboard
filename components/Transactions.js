import { Divider, Link, Text, transition } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useMoralisWeb3Api } from "react-moralis";
import CustomContainer from "./CustomContainer";

export default function Transactions({user}){
    const Web3Api = useMoralisWeb3Api()
    const BASE_URL = 'https://rinkeby.etherscan.io/tx/'
    const[transactions,setTransactions] = useState([])
    const fetchTransaction = async ()=>{
        const data = await Web3Api.account.getTransactions({
            chain:'rinkeby',
            address:user.get('ethAddress'),
            limit : 10
        })
        if(data){
            setTransactions(data.result)
        }
    }
    useEffect(()=>{
        fetchTransaction()
    },[])
    return(
        <CustomContainer>
            <Text fontSize='xl' fontWeight='bold' mb='6'>My Last 10 Transactions</Text>
            {transactions && transactions.map(transition =>(
                <div key={transition.hash}>
                    <Link href={`${BASE_URL}${transition.hash}`}isExternal>{transition.hash}</Link>
                    <Divider/>
                </div>
            ))}
        </CustomContainer>
    )
}