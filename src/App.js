import React, { Component } from 'react';
import logo from './logo.svg';
import logo1 from './surveylogo.png';
import 'bootstrap/dist/css/bootstrap.css';
import httpClient from 'axios'
import {
    Button,ButtonGroup,
    Form,FormGroup,ControlLabel,
    FormControl,HelpBlock,
    Checkbox,Radio,Grid,Row,Col,
    Table, Modal
} from 'react-bootstrap';


class App extends Component {



    state = {
        name: "",
        gender:"",
        gamingplatform:"",
        gamecategory: [],
        thoughts:"",
        records:[],


        show: false,
        editname: "",
        editgender:"",
        editgamingplatform:"",
        editgamecategory: [],
        editthoughts:"",


    };

    componentDidMount(){

        this.refreshData();
    }




     refreshData=()=>{

         httpClient.get('http://localhost:3004/surveys')
             .then((response)=> {
                 var data =response.data;
                 this.setState({
                     records:data.reverse()
                 })

             }).catch((error)=> {

             });

     };

     

    onChange = (fieldName)=> {
        return (event)=> {

            console.log(event.target.value);
            var state = this.state;
            state[fieldName] = event.target.value;
            this.setState(state);
        }
    };


/*...................modal code .....................*/
modalonChange = (fieldName)=> {
        return (event)=> {

            console.log(event.target.value);
            var state = this.state;
            state[fieldName] = event.target.value;
            this.setState(state);
        }
    };
/*...................modal code .....................*/


    checkboxChange = (fieldName)=> {
        return (event)=> {
            var targetArray = this.state[fieldName];
            if (targetArray.indexOf(event.target.value) >= 0)
                targetArray.splice(
                    targetArray.indexOf(event.target.value),
                    1
                );
            else
                targetArray.push(event.target.value);

            var state = this.state;
            state[fieldName] = targetArray;
            this.setState(state);
        }
    };


/*...................modal code .....................*/
modalcheckboxChange = (fieldName)=> {
        return (event)=> {
            var targetArray = this.state[fieldName];
            if (targetArray.indexOf(event.target.value) >= 0)
                targetArray.splice(
                    targetArray.indexOf(event.target.value),
                    1
                );
            else
                targetArray.push(event.target.value);

            var state = this.state.editgamecategory;
            state[fieldName] = targetArray;
            this.setState(state.editgamecategory);
        }
    };
/*...................modal code .....................*/



    saveSurvey = ()=> {

        var data = {
                    name: this.state.name,
                    gender: this.state.gender,
                    gamingplatform: this.state.gamingplatform,
                    gamecategory: this.state.gamecategory,
                    thoughts: this.state.thoughts};
         delete data.records;

        httpClient.post('http://localhost:3004/surveys',
         data)
            .then((response)=> {
                
                alert('Thanks for participating!');
                this.refreshData();
            }).catch((error)=> {

            });
location.reload();
    };

    deleteItem = (id)=>{

        return ()=>{

            httpClient.delete('http://localhost:3004/surveys/'+ id )
                .then((response)=> {

                    this.refreshData();
                }).catch((error)=> {

                });

        };
    };


/*...................edit code .....................*/
editItem = (id) =>{
        return ()=> {
            
            httpClient.get('http://localhost:3004/surveys/'+id)
                .then((response)=> {
                    console.log('edit');
                    var data = response.data
                    console.log(response.data);
                    this.setState({
                        name: data.name,
                        gamingplatform: data.gamingplatform,
                    })
                }).catch((error)=>{
                    
                });
        };
    };
/*...................edit code .....................*/

/*...................modal code .....................*/
openModal = (id)=>{

            return ()=>{
                this.setState({
                    show: true
                })

                 httpClient.get('http://localhost:3004/surveys/'+id)
                .then((response)=> {
                    var data = response.data
                    this.setState({
                        editname: data.name,
                        editgender: data.gender,
                        editgamingplatform: data.gamingplatform,
                        editgamecategory: data.gamecategory,
                        editthoughts: data.thoughts,
                        selectedId: data.id
                    })
                    console.log(this.state.selectedData.name);
                }).catch((error)=>{
                    
                });

            };
        };



        openModal1 = (id)=>{

            return ()=>{
                this.setState({
                    show: true
                })

                 httpClient.get('http://localhost:3004/surveys/'+id)
                .then((response)=> {
                    var data = response.data
                    this.setState({
                        editthoughts: data.thoughts,
                        selectedId: data.id
                    })
                    console.log(this.state.selectedData.thoughts);
                }).catch((error)=>{
                    
                });

            };
        };
/*...................modal code .....................*/


/*...................save edit code .....................*/
 saveEdit = (id) =>{


        return () => {
            console.log(data);
            var data = {name: this.state.editname,
                        gender: this.state.editgender,
                        gamingplatform: this.state.editgamingplatform,
                        gamecategory: this.state.editgamecategory,
                        thoughts: this.state.editthoughts};
            delete data.records;

            httpClient.patch('http://localhost:3004/surveys/'+id,
            data)
                .then((response)=> {
                    this.refreshData();
                }).catch((error)=> {

                });

            this.setState({
                show: false,
                editname: "",
                editgender:"",
                editgamingplatform:"",
                editgamecategory: [],
                editthoughts:""
            });
        }
    };
/*...................save edit code .....................*/




    render() {
{/* ............................................This is the community feedback............................................ */}
        var rows2  = this.state.records.map((item,i)=>{

            return (
                <tr key={i}>
                     <td><h3><strong className="user-design">{item.name}</strong> says:</h3> <h4><div className="thoughts-setting">{item.thoughts}</div></h4></td>
                </tr>
            );
        });
{/* ............................................This is the community feedback............................................ */}
        var rows  = this.state.records.map((item,i)=>{
{/* ............................................Table data remove comment if want to show............................................ */} 
            return (
                <tr key={i}>
                     <td><Button bsSize="small" bsStyle="danger" onClick={this.deleteItem(item.id)}>Delete</Button>
                         <Button bsSize="small" bsStyle="primary" onClick={this.openModal(item.id)}>Edit</Button></td>
                     <td>{item.id}</td>
                     <td className="textfieldarea">{item.name}</td>
                     <td>{item.gender}</td>
                     <td>{item.gamingplatform}</td>
                     <td>{
                         item.gamecategory.map((gamecategory, mi)=> {
                             return <div key={mi}>
                                   {gamecategory}
                                 </div>
                         })

                      }
                      </td>
                     <td className="textfieldarea">{item.thoughts}</td>
                </tr>
            );
 
        });

let close = () => this.setState({ show: false }) 
{/* ............................................Table data remove comment if want to show............................................ */}

        return (
            <div className="container">
                <div className="page-header">
                    <div className="header-setting">Gaming Survey<img src={logo1} className = "logo-setting"/></div>
                </div>
                <div className = "introduction-setting"><h2>Please take a few minutes of your life and answer the following survey:</h2></div>
                <div className="jumbotron">
                <div className="form-container">
                                <Form id = "SurveyForm">
{/* .......................................First Panel.......................................
                                <div className = "container-1">
                                <FormGroup>
                                        <ControlLabel><h2>Please confirm your age</h2></ControlLabel>
                                        <HelpBlock>You're not gonna fake your age like every gamers don't ya?</HelpBlock>
                                        <h3><Radio name="age" value="below 15"
                                               onChange={this.onChange('age')}>Below 15</Radio></h3>
                                        <h3><Radio name="age" value="16 to 20"
                                               onChange={this.onChange('age')}> 16 to 20</Radio></h3>
                                        <h3><Radio name="age" value="21  to 25"
                                               onChange={this.onChange('age')}> 21 to 25</Radio></h3>
                                        <h3><Radio name="age" value="26 above"
                                               onChange={this.onChange('age')}> 26 Above</Radio></h3>
                                    </FormGroup>
                                </div>
 .......................................First Panel.......................................*/}
{/* .......................................Second Panel.......................................*/}
                                    <div className="container-1">
                                    <FormGroup>
                                        <ControlLabel><h2>Enter your alias</h2></ControlLabel>
                                        <HelpBlock>It can be your frequently used in-game name</HelpBlock>
                                        <FormControl
                                            type="text"
                                            placeholder="Ex. 3lC4p1t4n, PewDiePie, S3np4i, PeenoiseRepublic, Pandesal etc. "
                                            value={this.state.name}
                                            onChange={this.onChange('name')}
                                            />
                                    </FormGroup>
                                    </div>
{/* .......................................Second Panel.......................................*/}
{/* .......................................Third Panel.......................................*/}
                                <div className="container-1">
                                <FormGroup>
                                        <ControlLabel><h2>What's your gender?</h2></ControlLabel>
                                        <HelpBlock>You're not gonna lie about your gender like every gamers don't ya?</HelpBlock>
                                        <h3><Radio name="gender" value="♂ Male"
                                               onChange={this.onChange('gender')}>♂ Male</Radio></h3>
                                        <h3><Radio name="gender" value="♀ Female"
                                               onChange={this.onChange('gender')}>♀ Female</Radio></h3>
                                    </FormGroup>
                                </div>
{/* .......................................Third Panel.......................................*/}
{/* .......................................Fourth Panel.......................................
                                <div className = "container-1">
                                <FormGroup>
                                        <ControlLabel><h2>How do you prefer to acquire video games?</h2></ControlLabel>
                                        <HelpBlock>So we know how gamers get their games</HelpBlock>
                                        <h3><Checkbox value="I rent games from the Arcade Shops"
                                                  checked={this.state.acquiregames.indexOf('I rent games from the Arcade Shops')>=0 ? true:false}
                                                  onChange={this.checkboxChange('acquiregames')}>
                                            I rent games from the Arcade Shops
                                        </Checkbox></h3>
                                        <h3><Checkbox value="I buy them online"
                                                  checked={this.state.acquiregames.indexOf('I buy them online')>=0 ? true:false}
                                                  onChange={this.checkboxChange('acquiregames')}>
                                            I buy them online
                                        </Checkbox></h3>
                                        <h3><Checkbox value="I download them online"
                                                  checked={this.state.acquiregames.indexOf('I download them online')>=0 ? true:false}
                                                  onChange={this.checkboxChange('acquiregames')}>
                                            I download them online
                                        </Checkbox></h3>
                                    </FormGroup>
                                </div>
 .......................................Fourth Panel.......................................*/}
{/* .......................................Fifth Panel.......................................*/}
                                        <div className="container-1">
                                        <FormGroup>
                                        <ControlLabel><h2>Which device do you use for gaming?</h2></ControlLabel>
                                        <FormControl componentClass="select"
                                                     value={this.state.gamingplatform}
                                                     onChange={this.onChange('gamingplatform')}
                                                     className = "selectoption-setting"
                                            >
                                            <option selected disabled>Choose here</option>
                                            <option value="Personal Computer Gaming Rig">Personal Computer Gaming Rig</option>
                                            <option value="Gaming Consoles">Gaming Consoles</option>
                                            <option value="Smartphone">Smartphone</option>
                                        </FormControl>
                                        <HelpBlock>For us to know what kinds of devices most of the gamers use</HelpBlock>
                                    </FormGroup>
                                    </div>
{/* .......................................Fifth Panel.......................................*/}
{/* .......................................Sixth Panel.......................................*/}
                                <div className="container-1">
                                <FormGroup>
                                        <ControlLabel><h2>What category do you usually play?</h2></ControlLabel>
                                        <HelpBlock>So we know what category gamers usually play</HelpBlock>
                                        <h3><Checkbox value="Adventure"
                                                  checked={this.state.gamecategory.indexOf('Adventure')>=0 ? true:false}
                                                  onChange={this.checkboxChange('gamecategory')}>
                                            Adventure
                                        </Checkbox></h3>
                                        <h3><Checkbox value="Arcade"
                                                  checked={this.state.gamecategory.indexOf('Arcade')>=0 ? true:false}
                                                  onChange={this.checkboxChange('gamecategory')}>
                                            Arcade
                                        </Checkbox></h3>
                                        <h3><Checkbox value="Logic"
                                                  checked={this.state.gamecategory.indexOf('Logic')>=0 ? true:false}
                                                  onChange={this.checkboxChange('gamecategory')}>
                                            Logic
                                        </Checkbox></h3>
                                        <h3><Checkbox value="Online(MMORPG)"
                                                  checked={this.state.gamecategory.indexOf('Online(MMORPG)')>=0 ? true:false}
                                                  onChange={this.checkboxChange('gamecategory')}>
                                            Online(MMORPG)
                                        </Checkbox></h3>
                                         <h3><Checkbox value="Role Playing Game(RPG)"
                                                  checked={this.state.gamecategory.indexOf('Role Playing Game(RPG)')>=0 ? true:false}
                                                  onChange={this.checkboxChange('gamecategory')}>
                                            Role Playing Game(RPG)
                                        </Checkbox></h3>
                                        <h3><Checkbox value="Simulator"
                                                  checked={this.state.gamecategory.indexOf('Simulator')>=0 ? true:false}
                                                  onChange={this.checkboxChange('gamecategory')}>
                                            Simulator
                                        </Checkbox></h3>
                                        <h3><Checkbox value="Sports"
                                                  checked={this.state.gamecategory.indexOf('Sports')>=0 ? true:false}
                                                  onChange={this.checkboxChange('gamecategory')}>
                                            Sports
                                        </Checkbox></h3>
                                        <h3><Checkbox value="Strategy"
                                                  checked={this.state.gamecategory.indexOf('Strategy')>=0 ? true:false}
                                                  onChange={this.checkboxChange('gamecategory')}>
                                            Strategy
                                        </Checkbox></h3>
                                        <h3><Checkbox value="Competitive(MOBA)"
                                                  checked={this.state.gamecategory.indexOf('Competitive(MOBA)')>=0 ? true:false}
                                                  onChange={this.checkboxChange('gamecategory')}>
                                            Competitive(MOBA)
                                        </Checkbox></h3>
                                    </FormGroup>
                                </div>
{/* .......................................Sixth Panel.......................................*/}
{/* .......................................Seventh Panel.......................................*/}
                                    <div className="container-1">
                                    <FormGroup>
                                        <ControlLabel><h2>What can you say about the current gaming community now?</h2></ControlLabel>
                                        <textarea
                                            type="textarea"
                                            placeholder="Tell us your thoughts . . ."
                                            value={this.state.thoughts}
                                            onChange={this.onChange('thoughts')}
                                            cols = "80"
                                            rows = "5"
                                            className = "form-control"
                                            />
                                    </FormGroup>
                                    </div>
{/* .......................................Seventh Panel.......................................*/}
                                    
                                    <ButtonGroup>
                                    
                                        <Button  bsStyle="btn btn-primary btn-lg" onClick={this.saveSurvey} >Submit</Button>

                                    </ButtonGroup>
                                    
                                </Form>




{/* ..............................................................................M O D A L..............................................................................*/}
<div className="modal-container" style={{height: 200}}>
                    <Modal
                    show={this.state.show}
                    onHide={close}
                    container={this}
                    aria-labelledby="contained-modal-title"
                    >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Edit information</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>

    {/* .......................................First Panel.......................................
                                    <div className = "container-1">
                                    <FormGroup>
                                            <ControlLabel><h2>Please confirm your age</h2></ControlLabel>
                                            <HelpBlock>You're not gonna fake your age like every gamers don't ya?</HelpBlock>
                                            <h3><Radio name="age" value="below 15"
                                                onChange={this.onChange('age')}>Below 15</Radio></h3>
                                            <h3><Radio name="age" value="16 to 20"
                                                onChange={this.onChange('age')}> 16 to 20</Radio></h3>
                                            <h3><Radio name="age" value="21  to 25"
                                                onChange={this.onChange('age')}> 21 to 25</Radio></h3>
                                            <h3><Radio name="age" value="26 above"
                                                onChange={this.onChange('age')}> 26 Above</Radio></h3>
                                        </FormGroup>
                                    </div>
     .......................................First Panel.......................................*/}
    {/* .......................................Second Panel.......................................*/}
                                        <div>
                                        <FormGroup>
                                            <ControlLabel><h2>Enter your alias</h2></ControlLabel>
                                            <HelpBlock>It can be your frequently used in-game name</HelpBlock>
                                            <FormControl
                                                type="text"
                                                placeholder="Ex. 3lC4p1t4n, PewDiePie, S3np4i, PeenoiseRepublic, Pandesal etc. "
                                                value={this.state.editname}
                                                onChange={this.modalonChange('editname')}
                                                />
                                        </FormGroup>
                                        </div>
    {/* .......................................Second Panel.......................................*/}
    {/* .......................................Third Panel.......................................*/}
                                    <div>
                                    <FormGroup>
                                            <ControlLabel><h2>What's your gender?</h2></ControlLabel>
                                            <HelpBlock>You're not gonna lie about your gender like every gamers don't ya?</HelpBlock>
                                            <h3><Radio name="editgender" value="♂ Male" checked={this.state.editgender == "♂ Male" ? true : false}
                                                onChange={this.modalonChange('editgender')}>♂ Male</Radio></h3>
                                            <h3><Radio name="editgender" value="♀ Female" checked={this.state.editgender == "♀ Female" ? true : false}
                                                onChange={this.modalonChange('editgender')}>♀ Female</Radio></h3>
                                        </FormGroup>
                                    </div>
    {/* .......................................Third Panel.......................................*/}
    {/* .......................................Fourth Panel.......................................
                                    <div className = "container-1">
                                    <FormGroup>
                                            <ControlLabel><h2>How do you prefer to acquire video games?</h2></ControlLabel>
                                            <HelpBlock>So we know how gamers get their games</HelpBlock>
                                            <h3><Checkbox value="I rent games from the Arcade Shops"
                                                    checked={this.state.acquiregames.indexOf('I rent games from the Arcade Shops')>=0 ? true:false}
                                                    onChange={this.checkboxChange('acquiregames')}>
                                                I rent games from the Arcade Shops
                                            </Checkbox></h3>
                                            <h3><Checkbox value="I buy them online"
                                                    checked={this.state.acquiregames.indexOf('I buy them online')>=0 ? true:false}
                                                    onChange={this.checkboxChange('acquiregames')}>
                                                I buy them online
                                            </Checkbox></h3>
                                            <h3><Checkbox value="I download them online"
                                                    checked={this.state.acquiregames.indexOf('I download them online')>=0 ? true:false}
                                                    onChange={this.checkboxChange('acquiregames')}>
                                                I download them online
                                            </Checkbox></h3>
                                        </FormGroup>
                                    </div>
    .......................................Fourth Panel.......................................*/}
    {/* .......................................Fifth Panel.......................................*/}
                                            <div>
                                            <FormGroup>
                                            <ControlLabel><h2>Which device do you use for gaming?</h2></ControlLabel>
                                            <FormControl componentClass="select"
                                                        value={this.state.editgamingplatform}
                                                        onChange={this.modalonChange('editgamingplatform')}
                                                        className="selectoption-setting"
                                                >
                                                <option selected disabled>Choose here</option>
                                                <option value="Personal Computer Gaming Rig">Personal Computer Gaming Rig</option>
                                                <option value="Gaming Consoles">Gaming Consoles</option>
                                                <option value="Smartphone">Smartphone</option>
                                            </FormControl>
                                            <HelpBlock>For us to know what kinds of devices most of the gamers use</HelpBlock>
                                        </FormGroup>
                                        </div>
    {/* .......................................Fifth Panel.......................................*/}
    {/* .......................................Sixth Panel.......................................*/}
                                    <div>
                                    <FormGroup>
                                            <ControlLabel><h2>What category do you usually play?</h2></ControlLabel>
                                            <HelpBlock>So we know what category gamers usually play</HelpBlock>
                                            <h3><Checkbox value="Adventure"
                                                    checked={this.state.editgamecategory.indexOf('Adventure')>=0 ? true:false}
                                                    onChange={this.modalcheckboxChange('editgamecategory')}>
                                                Adventure
                                            </Checkbox></h3>
                                            <h3><Checkbox value="Arcade"
                                                    checked={this.state.editgamecategory.indexOf('Arcade')>=0 ? true:false}
                                                    onChange={this.modalcheckboxChange('editgamecategory')}>
                                                Arcade
                                            </Checkbox></h3>
                                            <h3><Checkbox value="Logic"
                                                    checked={this.state.editgamecategory.indexOf('Logic')>=0 ? true:false}
                                                    onChange={this.modalcheckboxChange('editgamecategory')}>
                                                Logic
                                            </Checkbox></h3>
                                            <h3><Checkbox value="Online(MMORPG)"
                                                    checked={this.state.editgamecategory.indexOf('Online(MMORPG)')>=0 ? true:false}
                                                    onChange={this.modalcheckboxChange('editgamecategory')}>
                                                Online(MMORPG)
                                            </Checkbox></h3>
                                            <h3><Checkbox value="Role Playing Game(RPG)"
                                                    checked={this.state.editgamecategory.indexOf('Role Playing Game(RPG)')>=0 ? true:false}
                                                    onChange={this.modalcheckboxChange('editgamecategory')}>
                                                Role Playing Game(RPG)
                                            </Checkbox></h3>
                                            <h3><Checkbox value="Simulator"
                                                    checked={this.state.editgamecategory.indexOf('Simulator')>=0 ? true:false}
                                                    onChange={this.modalcheckboxChange('editgamecategory')}>
                                                Simulator
                                            </Checkbox></h3>
                                            <h3><Checkbox value="Sports"
                                                    checked={this.state.editgamecategory.indexOf('Sports')>=0 ? true:false}
                                                    onChange={this.modalcheckboxChange('editgamecategory')}>
                                                Sports
                                            </Checkbox></h3>
                                            <h3><Checkbox value="Strategy"
                                                    checked={this.state.editgamecategory.indexOf('Strategy')>=0 ? true:false}
                                                    onChange={this.modalcheckboxChange('editgamecategory')}>
                                                Strategy
                                            </Checkbox></h3>
                                            <h3><Checkbox value="Competitive(MOBA)"
                                                    checked={this.state.editgamecategory.indexOf('Competitive(MOBA)')>=0 ? true:false}
                                                    onChange={this.modalcheckboxChange('editgamecategory')}>
                                                Competitive(MOBA)
                                            </Checkbox></h3>
                                        </FormGroup>
                                    </div>
    {/* .......................................Sixth Panel.......................................*/}
    {/* .......................................Seventh Panel.......................................*/}
                                        <div>
                                        <FormGroup>
                                            <ControlLabel><h2>What can you say about the current gaming community now?</h2></ControlLabel>
                                            <textarea
                                                type="textarea"
                                                placeholder="Tell us your thoughts . . ."
                                                value={this.state.editthoughts}
                                                onChange={this.modalonChange('editthoughts')}
                                                cols="80"
                                                rows="5"
                                                className="form-control"
                                                />
                                        </FormGroup>
                                        </div>
    {/* .......................................Seventh Panel.......................................*/}
<ButtonGroup>
                                    
                                        <Button  bsStyle="btn btn-primary btn-lg" onClick={this.saveEdit(this.state.selectedId)}>Save Changes</Button>

                                    </ButtonGroup>
                                    
                                </Form>
</Modal.Body>
                        </Modal>
                        </div>




{/* ..............................................................................M O D A L..............................................................................*/}





{/* ............................................This is the community feedback............................................ */}       
                                <div className="introduction-setting2"><h2>Other user's feedback / thoughts / comments:</h2></div>
                                <div>
<Table>
                                    <thead>
                                    <tr>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {rows2}
                                    </tbody>
                                </Table>
          </div>
{/* ............................................This is the community feedback............................................ */}
                </div>





{/* ............................................Table data remove comment if want to show............................................ */}        
                <Table condensed  bordered hover className="table-setting">
                                    <thead>
                                    <tr>
                                        <th>Action</th>
                                        <th>Survey No.</th>
                                        <th>Alias</th>
                                        <th>Gender</th>
                                        <th>Device used for gaming</th>
                                        <th>Game Category</th>
                                        <th>Thoughts about the communities</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {rows}
                                    </tbody>
                                </Table>
{/* ............................................Table data remove comment if want to show............................................ */} 
                </div>
                <div className="page-footer">IT 411 FINAL PROJECT : <u>ReactJS App that connects to a REST Service</u> by <b>Cardel, Van Errel C.</b> BSIT - IV</div>
            </div>
        );
    }
}

export default App;
