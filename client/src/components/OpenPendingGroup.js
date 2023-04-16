import React from "react";

class OpenPendingGroup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            signedIn: localStorage.getItem("signedin"),
            signedInId: localStorage.getItem("signedinID"),
            groupName: localStorage.getItem("groupName"),
        }
    }
    notRun = true;
    componentDidMount(){
        if(this.notRun){
            this.openGroup();
        }
        
    }

    // for redirecting if not signed in 
    notRedirected = true;
    redirectNotSignedIn = () => {
        if(this.notRedirected){
            this.notRedirected = false;
            localStorage.setItem("redirectMessage", "Sign in to view groups");
            window.location.href = '/';
        }
    }

    // for redirecting if no group selected 
    notGroupRedirected = true;
    redirectNoGroupSelected = () => {
        if(this.notGroupRedirected){
            this.notGroupRedirected = false;
            localStorage.setItem("redirectMessage", "No Group Selected");
            window.location.href = '/groups';
        }
    }

    openGroup = async () => {
        this.notRun = false;
        const response = await fetch('/loadSpecificGroup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: this.state.signedInId,
                groupName: localStorage.getItem("groupName"), 
                groupCreator: localStorage.getItem("groupCreator"),
                groupStatus: localStorage.getItem("groupStatus"),
            }),
        });
        const responseJ = await response.json();

        if (responseJ.status === 'pending'){
            this.setState({pendingUsers: responseJ.pendingUsersArr});
        } else{
            this.setState({pendingUsers: null});
            window.location.href = '/opengroup';
        }
    }

    render(){
        const checkSignedIn = () => {
            if (this.state.signedIn != null && this.state.groupName != null) {
                return (
                    <div>
                        <div className="openGroupTitleDiv">
                            <h3 className='openGroupTitle'>Group:</h3>
                            <h4 className='openGroupTitleName'>{this.state.groupName}</h4>
                        </div>
                        
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <p id='stillPendingMessage'>This group is still pending. Waiting on the following users to respond to group request:</p>
                            <ul id='stillPendingUsersList'>{ this.state.pendingUsers && this.state.pendingUsers.map(user => {
                                return (
                                    <li id='stillPendingListItem' key={user}>{user}</li>
                                )
                            })
                            }</ul>
                        </div>
                    </div>
                );
            } else if (this.state.signedIn != null && this.state.groupName == null){
                return (
                    <div>
                        {this.redirectNoGroupSelected()}
                    </div>
                );
            } else {
                return (
                    <div>
                        {this.redirectNotSignedIn()}
                    </div>  
                );
            }
        }

        return(
            <div style={{minHeight: '800px'}}>
               {checkSignedIn()}
            </div>
        )
    }
}
export default OpenPendingGroup;