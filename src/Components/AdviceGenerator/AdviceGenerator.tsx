import { Box, Card, CardBody, Center, Text, Flex, Spinner, Image, CardFooter } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import axios from "axios";
import imageDivider from '../../assets/images/pattern-divider-desktop.svg'
import diceImage from '../../assets/images/icon-dice.svg'


export const AdviceGenerator: FC = () => {
    const [randomAdvice, setRandomAdvice] = useState<string>('');
    const [adviceId, setAdviceId] = useState<number | null>(null)
    const [isAdvice, setIsAdvice] = useState<boolean>(true)

    const getRandomAdvice = async () => {
        setIsAdvice(true)
        try {
            const response = await axios.get("https://api.adviceslip.com/advice");
            const { advice } = response.data.slip;
            setAdviceId(response.data.slip.id);
            setRandomAdvice(advice);
            setIsAdvice(false)

        } catch (error) {
            console.error("Failed to fetch random advice:", error);
        }
    };

    useEffect(() => {
        getRandomAdvice()
    }, [randomAdvice]);


    return (
        <>
            <Center
                w='100%'
            >
                <Flex
                    justifyContent='center'


                >
                    <Card
                        textAlign='center'
                        w={{ base: '90%', sm: '30rem' }}
                        bg='hsl(217, 19%, 24%)'
                        fontWeight={500}
                        borderRadius='xl'
                    >

                        <Text
                            color='hsl(150, 100%, 66%)'
                            letterSpacing={5}
                            textTransform='uppercase'
                            mt={10}
                        >Advice #{adviceId}</Text>
                        <CardBody
                            fontSize='28px'

                        >
                            <Flex
                                direction='column'
                                alignItems='center'
                                flexWrap={'wrap'}
                            >

                                {isAdvice ? (

                                    <Spinner />
                                ) :
                                    <>
                                        <Text>
                                            <q>{randomAdvice}</q>

                                        </Text>
                                    </>

                                }
                            </Flex>
                        </CardBody>
                        <CardFooter>
                            <Flex
                                direction='column'
                                alignItems='center'
                            >

                                <Image
                                    mb={4}
                                    w='85%'
                                    src={imageDivider}
                                    alt='divider'
                                />
                                <Box
                                    onClick={getRandomAdvice}
                                    position='relative'
                                    top={12}
                                    borderRadius='full'
                                    w='70px'
                                    h='70px'
                                    bg='hsl(150, 100%, 66%)'
                                    display='flex'
                                    justifyContent='center'
                                    alignItems='center'
                                    _hover={{
                                        cursor: 'pointer', boxShadow: "0 0 20px 1px hsl(150, 100%, 66%)",
                                    }}
                                >
                                    <Image
                                        src={diceImage}
                                    />
                                </Box>
                            </Flex>

                        </CardFooter>
                    </Card>
                </Flex>
            </Center >
        </>
    );
}