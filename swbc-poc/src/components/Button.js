import React from 'react';
import './Button.css'
import { Link } from 'react-router-dom';

const STYLES =['btn--primary', 'btn--outline']

const SIZES = ['btn--medium', 'btn--large']

export const Button = ({children, type, onClick, buttonStyle, butttonSize}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0]
    const checkButtonSize = SIZES.includes(butttonSize) ? butttonSize : SIZES[0]
}