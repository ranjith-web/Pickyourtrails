import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, animateScroll as scroll } from "react-scroll";
//Components
import Destination from '../components/destination/destination';
import Vacation from '../components/vacation/vacation';
import Itineraries from '../components/itineraries/itineraries';
//Action
import { fetchTrails } from '../Store/actions/index';
//Styles
import './style.css';

const getUnique = (arr, comp) => {    
    const unique = arr.map(e => e[comp])

        // store the keys of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)

    // eliminate the dead keys & store unique objects
    .filter(e => arr[e]).map(e => arr[e]);

    return unique;
}
class Travels extends Component{
    constructor(){
        super();
        this.state = {
            destinations:[],
            vacations: [],
            itineraries: [],
            alphabets: ["0-9", "A", "B", "C", "D", "F", "H", "J", "K", "L", "N", "O", "P", "R", "S", "T", "V", "W", "Z"],
            active:"0-9"
        }
        this.performScopeBindings();
    }
    componentDidMount(){
        this.props.fetchTravels();
    }
    componentWillReceiveProps(nextProps, state){
        if(nextProps !== state){
            this.destination(nextProps.travelTrails.payload);
            this.vacation(nextProps.travelTrails.payload);
            this.itineraries(nextProps.travelTrails.payload);
        }        
    }
    render(){
        const travelTrails = this.props.travelTrails.payload ? true : false;
        const pagination = (props, alphabets) => {
            
            return(
                <ul className="pagination pg-blue dashed-border pdb-20" id="t-pagination">
                    {alphabets.map( (item, idx) => {
                        return(
                            <li key={idx} onClick={() => this.paginationClick(item)} className={`page-item ${this.state.active === item ? 'active' : ''}`}>
                                <Link
                                    className="page-link"
                                    activeClass="active"
                                    to={`section-${item}`}
                                    spy={true}
                                    smooth={true}
                                    offset={-70}
                                    duration= {500}>
                                    {item}
                                </Link>
                            </li>
                        )                        
                    })}
                </ul>
            )
        }
        return(
            <div className="fluid-container t-container">
                <h1>Pickyourtrail siteMap</h1>
                { travelTrails ?
                    <React.Fragment>
                        <div className="row">
                            <div className="col-sm-12 pdb-30">
                                <Destination 
                                title="Destinations" 
                                destination={this.state.destinations}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12 pdb-30">
                                <Vacation 
                                title="Vacations" 
                                vacation={this.state.vacations}
                                />
                            </div>
                        </div>
                        <div className="row p-sticky">
                            <div className="col-sm-12 pdb-30">
                                <h3 className="dashed-border mrb pdb-20">Show All {this.props.travelTrails.payload.destinations.length} Pages</h3>
                                <nav aria-label="Page navigation example">
                                    {pagination(this.props.travelTrails.payload, this.state.alphabets)}
                                </nav>
                            </div>
                        </div>
                        <Itineraries itineraries={this.state.itineraries}/>
                    </React.Fragment>
                :<div className="loader"></div>}
            </div>
        )
    }
    scrollToTop() {
        scroll.scrollToTop(); 
    }
    destination(props){
        const { destinations } = props;
        const uniqueDestination = getUnique(destinations, 'text');
        this.setState({destinations: uniqueDestination});
    }
    vacation(props){
        const { vacations } = props;
        this.setState({vacations: vacations});
    }
    itineraries(props){
        const { itineraries } = props;
        const alpha = this.state.alphabets;
        const alphaLen = alpha.length;
        const regOnlyDigits = /^\d+$/;
        const _itineraries = [];
        const onlyNumbers = itineraries.filter( (item) => {
            return regOnlyDigits.test(item.text.charAt(0));
        });
        _itineraries[0] = {group:alpha[0], itineraries:onlyNumbers};
        for(var al = 1; al < alphaLen; al++){
            const itiner = itineraries.filter( (item) => {
                return item.text.charAt(0) === alpha[al];
            });
            _itineraries.push({group: alpha[al], itineraries: itiner})
        }
        this.setState({itineraries: _itineraries});
    }
    paginationClick(sAlpha){
        this.setState({active:sAlpha})
    }
    performScopeBindings(){
        this.paginationClick = this.paginationClick.bind(this);
    }
}
const mapStateToProps = (state, ownProps) => ({
    'travelTrails': state.travels
});
const mapDispatchToProps = (dispatch) => {
    return{
        fetchTravels: () => dispatch(fetchTrails())
    }    
};
export default connect(mapStateToProps, mapDispatchToProps)(Travels);