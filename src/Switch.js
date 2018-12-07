import React from 'react'
import {css} from 'emotion'

export default class Switch extends React.Component {

    render() {

        const {checked, disabled} = this.props

        const width = this.props.width || 46
        const height = width * 0.56
        const padding = 2
        const size = height - (padding * 2)

        return (
            <div
                className={css`
                    background-color: ${checked ? '#3acc85' : '#000'};
                    display: flex;
                    flex: none;
                    border-radius: 99999px;
                    justify-content: ${checked ? 'flex-end' : 'flex-start'};
                    transition: 300ms ease justify-content;
                    ${disabled ? '' : 'cursor: pointer;'}
                    opacity: ${disabled ? '0.7' : '1'};
                `}
                style={{
                    height,
                    width,
                    padding
                }}
                onClick={(e) => {

                    if (this.props.onChange) {

                        this.props.onChange({
                            id: this.props.id,
                            e,
                            checked: !checked
                        })
                    }
                }}
            >
                <div
                    className={css`
                        background-color: #fff;
                        border-radius: 50%;
                        flex: none;
                    `}
                    style={{
                        width: size
                    }}
                />
            </div>
        )
    }
}