import React from 'react'
import {css} from 'emotion'

export default class Select extends React.Component {

    render() {

        return (
            <select
                className={css`
                    background-color: #fff;
                    border-width: 2px;
                    border-style: solid;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    appearance: none;
                    width: 100%;
                    background-repeat: no-repeat;
                    background-position: calc(100% - 6px) center;
                    padding: 8px;
                    padding-right: 22px;
                    border: 1px solid #000;
                    font-size: 14px;
                `}
                value={this.props.value || ''}
                onChange={this.handleChange}
            >
                {this.props.description ? (
                    <option disabled>
                        {this.props.description}
                    </option>
                ) : null}
                {this.props.options.map(option => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        )
    }

    handleChange = e => {

        if (!this.props.onChange) {
            return
        }

        this.props.onChange({
            id: this.props.id,
            value: e.target.value
        })
    }
}