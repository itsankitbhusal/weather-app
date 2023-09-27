import React, { Component } from "react";

class Card extends Component {
    render() {
        const { firstData, firstName, secondData, secondName } = this.props;

        return (
            <div className=' flex justify-between gap-8 mt-4'>
                <div className='grid place-items-center items-center'>
                    <p className='font-semibold'>{firstData}</p>
                    <p>{firstName}</p>
                </div>
                <div className=' grid place-items-center items-center'>
                    <p className=' font-semibold'>{secondData}</p>
                    <p>{secondName}</p>
                </div>
            </div>
        )
    }
}
export default Card;