import React from 'react';
import './CheckBox.scss';

interface CheckBoxData {
    label: string,
    checked: boolean
    onChange: (value:any) => void
}

const CheckBox = (props : CheckBoxData) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    const onChange = () => {
        if (props.onChange) {
            props.onChange(inputRef.current);
        }
    };

    return (
        <label className="custom-checkbox">
            <input type="checkbox" ref={inputRef} onChange={onChange} checked={props.checked} />
            <span className="custom-checkbox__checkmark">
                <i className="bx bx-check"></i>
            </span>
            {props.label}
        </label>
    );
};

export default CheckBox;
