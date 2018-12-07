import React from 'react'
import {css} from 'emotion'
import Switch from './Switch'

export default class CheckboxField extends React.Component {

    render() {

        return (
            <div
                className={css`
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                `}
                onClick={this.handleChange}
            >
                <Switch
                    width={26}
                    checked={this.props.value}
                />
                <div
                    className={css`
                        margin-left: 8px;
                        font-size: 14px;
                    `}
                >
                    {this.props.title}
                </div>
            </div>
        )
    }

    handleChange = () => {
        this.props.onChange({
            id: this.props.id,
            value: !this.props.value
        })
    }
}