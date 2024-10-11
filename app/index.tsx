import { Dimensions, StyleSheet } from "react-native";
import { Surface, useTheme } from "react-native-paper";
import { View } from "react-native";
import { useState } from "react";
import { evaluate } from 'mathjs'
import * as Animatable from 'react-native-animatable'

import { HeadBar, KeyBoard } from "@/components";
import { fadeInResult } from '@/utils/animation'

const { height } = Dimensions.get("window")

export default function Index() {
  const theme = useTheme()
  const [valueInput, setValueInput] = useState("")
  const [valueResult, setValueResult] = useState<string | number>(0)

  const [fontSizeResult, setFontSizeResult] = useState<number>(30)
  const animationResult = fadeInResult

  const array_number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
  const array_operator = ["+", "÷", "×", "-", "^"]
  const array_other = ["."]

  const getResponse = (eq: string = valueInput) => {
    if (eq === "Erreur" || valueInput === "Erreur"){
      setValueInput("");
      setValueResult(0);
      return;
    }
    eq = eq.replaceAll("×", "*").replaceAll("÷", "/")
    try{
      let resp = evaluate(eq)
      if (Number.isNaN(resp)) resp = 0;
      if (resp === Infinity) resp = "Erreur"
      setValueResult(resp ?? 0)
    } catch(error){ }
  }

  const onReset = () =>{
    setValueInput(""); 
    getResponse("");
  }
  const onDeleteLastElement = () =>{
    const eq = valueInput.slice(0, -1)
    setValueInput(eq);
    getResponse(eq);
  }

  const onPressedButton = (value: string | number) => {
    setFontSizeResult(25)
    let eq = valueInput;
    const all_array = [...array_number, ...array_operator, ...array_other];

    if (value === "C") return onReset();
    if (value === "⊗") return onDeleteLastElement();

    const lastInput = valueInput.slice(-1);
    const isLastInputOperator = array_operator.includes(lastInput);
    const isLastInputOther = array_other.includes(lastInput);
    const isValueOperator = array_operator.includes(value.toString());
    const isValueOther = array_other.includes(value.toString());

    if (!valueInput && isValueOperator) return;
    if ((isLastInputOperator && isValueOther) || (isLastInputOther && isValueOperator) || 
        (isLastInputOther && isValueOther)) return;

    if (value === "=") {
      const eq = valueInput.replaceAll("×", "*").replaceAll("÷", "/")
      try{
        let resp = evaluate(eq)
        if (Number.isNaN(resp)) resp = 0;
        if (resp === Infinity) resp = "Erreur"
        setValueResult("")
        setValueInput(resp?.toString())
        // Gèrer le fontsize en fonction de la longeur du nombre
        setFontSizeResult(resp?.toString().length <= 10? 40 : 25)
      } catch(err) {console.log(err); setValueResult("Erreur")}
      finally{ return }
    }

    if (all_array.includes(value)) {
        eq = (isLastInputOperator && isValueOperator) 
            ? valueInput.slice(0, -1) + value.toString() 
            : valueInput + value.toString();
        
        setValueInput(eq);
        getResponse(eq);
    }
  }

  const onLongPressedButton = (value: number | string ) => {
  }


  return (
    <Surface style={{flex: 1, justifyContent: "space-between", paddingVertical: 20}}>
      <HeadBar />
      <View>
        <Animatable.Text 
          style={[
            styles.textInput, 
            { 
              fontSize: fontSizeResult,
              color: theme.colors.primary,
            }
          ]}
          transition={"fontSize"}
          duration={500}
        >
          {valueInput}
        </Animatable.Text>

        <Animatable.Text
          style={[
            styles.result,
            {
              fontSize: 20,
              color: theme.colors.outline,
            }
          ]}
          duration={500}
          animation={animationResult}
        >
          {valueResult}
        </Animatable.Text>
      </View>
      <KeyBoard 
        onPressedButton={onPressedButton} 
        onLongPressedButton={onLongPressedButton}
        style={{height: "50%"}}
      />
    </Surface>
  );
}

const styles = StyleSheet.create({
  result: {
    lineHeight: height / 7,
    fontWeight: "bold",
    paddingHorizontal: 10,
    textAlign: "right",
  },
  textInput: {
    height: height / 5,
    textAlignVertical: "bottom",
    textAlign: "right",
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 30,
  }
})

