import React from 'react';
import './style.css';

const Destination = (props) => (
    <section id="section-destination">
        <h3 className="dashed-border mrb pdb-20">{props.title}</h3>
        {
            props.destination.map( (item,_id) => {
                return(
                    <div className="col-sm-2 lists-name" key={_id}>
                        <span><a href={item.url}>{item.text}</a></span>
                    </div>
                )
            })
        }
    </section>
);

export default Destination;