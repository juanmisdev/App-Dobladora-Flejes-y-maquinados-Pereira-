import { Fragment, useContext, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { Event, getAllLocalStorageItems, getRefValue, getRefValues, isTrue, preventDefault, refs, set_val, spreadArraysOrObjects, uploadFiles, useEventLoop } from "/utils/state"
import { ColorModeContext, EventLoopContext, initialEvents, StateContext } from "/utils/context.js"
import range from "/utils/helpers/range.js"
import "focus-visible/dist/focus-visible"
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Container, Grid, GridItem, HStack, Input, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Radio, RadioGroup, Text, VStack } from "@chakra-ui/react"
import { getEventURL } from "/utils/state.js"
import NextHead from "next/head"



export default function Component() {
  const state = useContext(StateContext)
  const router = useRouter()
  const [ colorMode, toggleColorMode ] = useContext(ColorModeContext)
  const focusRef = useRef();
  
  // Main event loop.
  const [addEvents, connectError] = useContext(EventLoopContext)

  // Set focus to the specified element.
  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  })

  // Route after the initial page hydration.
  useEffect(() => {
    const change_complete = () => addEvents(initialEvents())
    router.events.on('routeChangeComplete', change_complete)
    return () => {
      router.events.off('routeChangeComplete', change_complete)
    }
  }, [router])


  return (
    <Fragment>
  <Fragment>
  {isTrue(connectError !== null) ? (
  <Fragment>
  <Modal isOpen={connectError !== null}>
  <ModalOverlay>
  <ModalContent>
  <ModalHeader>
  {`Connection Error`}
</ModalHeader>
  <ModalBody>
  <Text>
  {`Cannot connect to server: `}
  {(connectError !== null) ? connectError.message : ''}
  {`. Check if server is reachable at `}
  {getEventURL().href}
</Text>
</ModalBody>
</ModalContent>
</ModalOverlay>
</Modal>
</Fragment>
) : (
  <Fragment/>
)}
</Fragment>
  <VStack justify={`center`} sx={{"centerContent": true, "bg": "lightblue", "height": "100vh", "width": "100vw", "overflow": "hidden", "padding": 0}}>
  <Box sx={{"bg": "lightgreen", "borderRadius": "20px", "borderColor": "green", "borderWidth": "thick", "padding": 5, "width": "50%", "height": "5%"}}>
  <RadioGroup>
  <RadioGroup defaultValue={`Pieza`} onChange={(_e0) => addEvents([Event("state.set_tipo_pieza", {value:_e0})], (_e0), {})}>
  <HStack spacing={`3em`}>
  {["Bandeja", "Pieza"].map((kcifpvxw, xoclnsdj) => (
  <Radio key={xoclnsdj} value={kcifpvxw}>
  {kcifpvxw}
</Radio>
))}
</HStack>
</RadioGroup>
</RadioGroup>
</Box>
  <Box sx={{"bg": "lightgreen", "borderRadius": "20px", "borderColor": "green", "borderWidth": "thick", "padding": 5, "width": "50%", "height": "50%"}}>
  <Grid sx={{"h": "50%", "width": "100%", "gap": 4, "marginBottom": "3em", "padding": 0}} templateColumns={`repeat(3, 3fr)`} templateRows={`repeat(4, 3fr)`}>
  <GridItem>
  <Button onClick={(_e) => addEvents([Event("state.set_1", {})], (_e), {})} sx={{"width": "100%", "height": "100%"}}>
  {`1`}
</Button>
</GridItem>
  <GridItem>
  <Button onClick={(_e) => addEvents([Event("state.set_2", {})], (_e), {})} sx={{"width": "100%", "height": "100%"}}>
  {`2`}
</Button>
</GridItem>
  <GridItem>
  <Button onClick={(_e) => addEvents([Event("state.set_3", {})], (_e), {})} sx={{"width": "100%", "height": "100%"}}>
  {`3`}
</Button>
</GridItem>
  <GridItem>
  <Button onClick={(_e) => addEvents([Event("state.set_4", {})], (_e), {})} sx={{"width": "100%", "height": "100%"}}>
  {`4`}
</Button>
</GridItem>
  <GridItem>
  <Button onClick={(_e) => addEvents([Event("state.set_5", {})], (_e), {})} sx={{"width": "100%", "height": "100%"}}>
  {`5`}
</Button>
</GridItem>
  <GridItem>
  <Button onClick={(_e) => addEvents([Event("state.set_6", {})], (_e), {})} sx={{"width": "100%", "height": "100%"}}>
  {`6`}
</Button>
</GridItem>
  <GridItem>
  <Button onClick={(_e) => addEvents([Event("state.set_7", {})], (_e), {})} sx={{"width": "100%", "height": "100%"}}>
  {`7`}
</Button>
</GridItem>
  <GridItem>
  <Button onClick={(_e) => addEvents([Event("state.set_8", {})], (_e), {})} sx={{"width": "100%", "height": "100%"}}>
  {`8`}
</Button>
</GridItem>
  <GridItem>
  <Button onClick={(_e) => addEvents([Event("state.set_9", {})], (_e), {})} sx={{"width": "100%", "height": "100%"}}>
  {`9`}
</Button>
</GridItem>
  <GridItem>
  <Button onClick={(_e) => addEvents([Event("state.set_0", {})], (_e), {})} sx={{"width": "100%", "height": "100%"}}>
  {`0`}
</Button>
</GridItem>
  <GridItem>
  <Button onClick={(_e) => addEvents([Event("state.set_punto", {})], (_e), {})} sx={{"width": "100%", "height": "100%"}}>
  {`.`}
</Button>
</GridItem>
  <GridItem>
  <Button onClick={(_e) => addEvents([Event("state.clear_text", {})], (_e), {})} sx={{"width": "100%", "height": "100%"}}>
  {`Borrar`}
</Button>
</GridItem>
</Grid>
  <Container centerContent={true} sx={{"width": "70%", "height": "10%"}}>
  <Text sx={{"colorScheme": "green", "fontSize": "2em", "width": "100%", "height": "100%", "marginY": 0}}>
  {`Medida de la pieza (cm):`}
</Text>
</Container>
  <Container centerContent={true} sx={{"width": "70%", "height": "20%"}}>
  <Input placeholder={`Ingrese la medida`} sx={{"width": "100%", "height": "100%", "fontSize": "2em"}} type={`text`} value={state.text}/>
</Container>
  <Container centerContent={true} sx={{"width": "70%", "height": "10%"}}>
  <Button onClick={(_e) => addEvents([Event("state.calcular", {})], (_e), {})} size={`md`} sx={{"bg": "lightblue", "color": "black", "marginY": 2, "width": "100%", "height": "100%"}}>
  {`Calcular`}
</Button>
</Container>
  <AlertDialog isOpen={state.show}>
  <AlertDialogOverlay>
  <AlertDialogContent>
  <AlertDialogHeader>
  {`Combinacion`}
</AlertDialogHeader>
  <AlertDialogBody>
  {("La combinacion de punzones correcta es: " + state.combinacion)}
</AlertDialogBody>
  <AlertDialogFooter>
  <Button onClick={(_e) => addEvents([Event("state.close_alert", {})], (_e), {})}>
  {`Ok`}
</Button>
</AlertDialogFooter>
</AlertDialogContent>
</AlertDialogOverlay>
</AlertDialog>
</Box>
</VStack>
  <NextHead>
  <title>
  {`Reflex App`}
</title>
  <meta content={`A Reflex app.`} name={`description`}/>
  <meta content={`favicon.ico`} property={`og:image`}/>
</NextHead>
</Fragment>
  )
}
