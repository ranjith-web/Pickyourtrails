import React from 'react';
import './style.css';

const ItemLists = (props) => {
    if(props.itinery.length > 0 ){
        return(
            <div className="col-sm-10">                
                {props.itinery.map( (item, idx) => {
                    return(
                        <div className="col-sm-2 lists-name" key={idx}>
                            <span><a href={item.url}>{item.text}</a></span>
                        </div>
                    )
                })}
                
            </div>
        )
    }else{
        return(
            <div className="col-sm-10">
                <span><a href="#"> No Itineraries Mached In This Group</a></span>
            </div>
        )
    }
    
}
const Itineraries = (props) => (
    <React.Fragment>
        {props.itineraries.map( (item, idx) => {
            return(
                <div key={idx} className="row i__section" id={`section-${item.group}`}>
                    <div className="col-sm-2">
                        <h1>{item.group}</h1>
                    </div>
                    <ItemLists itinery={item.itineraries}/>
                </div>
            )
        })}
    </React.Fragment>
);

export default Itineraries;