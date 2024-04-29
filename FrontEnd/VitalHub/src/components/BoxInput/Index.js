
import { FieldContent, InputLabel, InputText, InputTextModificate } from "./Style"
import InputScrollView from "react-native-input-scroll-view"


export const BoxInput = ({
    fieldWidth = 100,
    textLabel,
    placeholder,
    fieldValue,
    fieldHeight = 80,
    editable = false,
    multiline = false,
    marginBottom = 30,
    insertRecord = false,
    onChangeText,
}) => {
    return (
        <FieldContent fieldWidth={fieldWidth} marginBottom={marginBottom}>

            <InputLabel >{textLabel}</InputLabel>
            {insertRecord ? (
                <>
                <InputTextModificate 
                onChangeText={onChangeText}
                placeholder={placeholder} value={fieldValue} editable={editable}
                fieldHeight={fieldHeight} multiline={multiline}/>
                </>
            ) : (
                <>
                <InputText
                   onChangeText={onChangeText}
                placeholder={placeholder} value={fieldValue} editable={editable}
                fieldHeight={fieldHeight} multiline={multiline} />
                </>
            )}
            

        </FieldContent>
    )
}