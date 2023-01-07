import React from 'react';

class ProfilePage extends React.Component {

    state={
        count:0
    }
     test = () => {
        console.log('循环100次 setState前的count', this.state.count)
        for(let i=0;i<100;i++) {
          this.setState({
            count: this.state.count + 1
          })
        }
        console.log('循环100次 setState后的count', this.state.count)
      }
  showMessage = () => {
    alert('Followed ' + this.props.user);
  };

  handleClick = () => {
    setTimeout(this.showMessage, 3000);
  };

  render() {
    return <button onClick={this.test}>Follow</button>;
  }
}

export default ProfilePage;
