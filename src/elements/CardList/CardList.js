import React from "react"
import classes from "./CardList.module.css"
import Card from "../Card/Card"
import StationInfo from '../../components/StationInfo/StationInfo';

const cardList = props => {
    
    return (
        <div className={classes.cardListWrapper}>
            {
                props.data.map((item)=>{
                    return(
                        <Card key={item.key}>
                            <StationInfo data = {item} />
                        </Card>
                    )
                })
            }
        </div>
      )
  
}
export default cardList