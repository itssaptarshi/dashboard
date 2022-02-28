import { Button, FormControl, FormLabel, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text, useToast } from "@chakra-ui/react";
import { Description } from "@ethersproject/properties";
import Moralis from "moralis";
import { useState } from "react";
import { useWeb3Transfer } from "react-moralis";
import CustomContainer from "./CustomContainer";

export default function SendEth(){
    const[amount,setAmount] = useState(0)
    const toast = useToast()
    const[receiver,setReceier] = useState('')
    const handleChange = (value) => setAmount(value)
    const{fetch,isFetching} = useWeb3Transfer({
        amount:Moralis.Units.ETH(amount),
        receiver:receiver,
        type:'native'
    })
    return(
        <CustomContainer>
            <Text fontSize='xl' fontWeight='bold' mb='6'>Send Eth</Text>
            <form onSubmit={async e=>{
                e.preventDefault()
                await Moralis.enableWeb3()
                fetch({
                    onSuccess:()=>{
                        toast({
                            title:'Eth Successfully Sent.',
                            description:"Fresh Eth Sent On The Receiver's Address.",
                            status:'success',
                            duration:9000,
                            isClosable:true
                        })
                        setReceier('')
                    },
                    onError:(error)=>{
                        toast({
                            title:'Error',
                            description:error,
                            status:'error',
                            duration:'9000',
                            isClosable:true
                        })
                    }
                })
            }}>
                <FormControl>
                    <FormLabel htmlFor="amount">
                        Amount Of Eth
                    </FormLabel>
                    <NumberInput step={0.1} onChange={handleChange}>
                        <NumberInputField id='amount' value={amount}/>
                        <NumberInputStepper>
                            <NumberIncrementStepper/>
                            <NumberDecrementStepper/>
                        </NumberInputStepper>
                    </NumberInput>
                    <FormLabel htmlFor="receiver">Send To</FormLabel>
                    <Input id="receiver" type='text' placeholder="Receiver Address" value={receiver} onChange={e=>setReceier(e.target.value)}/>
                </FormControl>
                <Button mt='4' type="submit" colorScheme='purple' disabled={isFetching}>Send</Button>
            </form>
        </CustomContainer>
    )
}