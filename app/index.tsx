import { Dimensions, StyleSheet, TextInput } from "react-native";
import { Surface, Text, useTheme } from "react-native-paper";
import { View } from "react-native";
import { useState } from "react";
import { evaluate, format } from 'mathjs'
import * as Animatable from 'react-native-animatable'

import { KeyBoard } from "@/components";
import { fadeInResult } from '@/utils/animation'

const { height } = Dimensions.get("window")

export default function Index() {
  const theme = useTheme()
  const [valueInput, setValueInput] = useState("")
  const [valueResult, setValueResult] = useState<string | number>(0)

  const [sizeOperation, setSizeOperation] = useState<number>(30)
  const animationResult = fadeInResult

  const array_number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
  const array_operator = ["+", "÷", "×", "-"]
  const array_other = ["."]

  const getResponse = (eq: string = valueInput) => {
    eq = eq.replaceAll("×", "*").replaceAll("÷", "/")
    try{
      const resp = evaluate(eq)
      setValueResult(resp ?? 0)
    } catch(error){}
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
    setSizeOperation(25)
    let eq = valueInput;
    const all_array = [...array_number, ...array_operator, ...array_other];

    if (value === "C") {
        onReset();
        return;
    }
    
    if (value === "⊗") {
        onDeleteLastElement();
        return;
    }

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
        const resp = evaluate(eq)
        setValueResult("")
        setValueInput(resp.toString())
        setSizeOperation(60)
      } catch(err) { setValueResult("Erreur")}
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



  return (
    <Surface style={{flex: 1, justifyContent: "space-between", paddingVertical: 20}}>
      <View>
        <Animatable.Text 
          style={[
            styles.textInput, 
            { 
              fontSize: sizeOperation,
              color: theme.colors.onSurface
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
      <KeyBoard onPressedButton={onPressedButton} style={{height: "50%"}}/>
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
    height: height / 3,
    textAlignVertical: "bottom",
    textAlign: "right",
    padding: 10,
    fontSize: 30,
  }
})

