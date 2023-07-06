import { useState } from "react";

function useHookWithValidate(initial) {
    const [value, setValue] = useState(initial);

    const onChange = e => {
        setValue(e.target.value)
    }

    const validate = () => {
        console.log(value.search(/\d/));
        return value.search(/\d/) === -1 ? false : true
    }

    return {value, onChange, validate}
}

function OwnHookTest() {
    // const [text, setText] = useState('');
    // const [textArea, setTextArea] = useState('');

    const text = useHookWithValidate('');
    const textArea = useHookWithValidate('');

    // function validate(message) {
    //     console.log(message.search(/\d/))
    //     return message.search(/\d/) === -1 ? false : true;
    // }

    const styled = text.validate() ? {color: 'red'} : null;

    return (
        <div>
            <input type="text" value={`${text.value} / ${textArea.value}`} readOnly/>
            <div>email</div>
            <input type="text" placeholder="Введите не число"  value={text.value} onChange={e => text.onChange(e)} style={styled}/>
            <br />
            <br />
            <textarea name="" id="" cols="30" rows="10"  value={textArea.value} onChange={textArea.onChange}></textarea>
        </div>
    )
}

export default OwnHookTest;

console.log(Math.floor(Math.random() * (50 - (-50)) + (-50)) )