import React from 'react';
import './style.css';

const vacation = (props) => (
    <section id="section-vacation">
        <h3 className="dashed-border mrb pdb-20">{props.title}</h3>
        {
            props.vacation.map( (item,_id) => {
                return(
                    <div className="col-sm-2 lists-name" key={_id}>
                        <span><a href={item.url}>{item.text}</a></span>
                    </div>
                )
            })
        }
    </section>
);

export default vacation;