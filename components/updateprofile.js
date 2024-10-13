import React, { Component } from 'react';

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      showPasswordUpdate: false,
      showProfileUpdate: false,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      organization: '',
    };
  }

  togglePasswordUpdate = () => {
    this.setState({
      showPasswordUpdate: true,
      showProfileUpdate: false,
    });
  }

  toggleProfileUpdate = () => {
    this.setState({
      showPasswordUpdate: false,
      showProfileUpdate: true,
    });
  }

  handleInputChange = (name, value) => {
    this.setState({ [name]: value });
  }

  handlePasswordUpdate = () => {
    // Send a request to update the user's password.
    // You should add validation and error handling here.

    // Reset the password fields
    this.setState({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  }

  handleProfileUpdate = () => {
    // Send a request to update the user's profile information.
    // You should add validation and error handling here.
  }

  render() {
    const { showPasswordUpdate, showProfileUpdate } = this.state;

    return (
      <div>
        <h2>User Profile</h2>
        <ul>
          <li onClick={this.togglePasswordUpdate}>Update Password</li>
          <li onClick={this.toggleProfileUpdate}>Update Profile</li>
        </ul>
        {showPasswordUpdate && (
          <div>
            <h3>Update Password</h3>
            <input
              type="password"
              placeholder="Current Password"
              value={this.state.currentPassword}
              onChange={(e) => this.handleInputChange('currentPassword', e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              value={this.state.newPassword}
              onChange={(e) => this.handleInputChange('newPassword', e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={this.state.confirmPassword}
              onChange={(e) => this.handleInputChange('confirmPassword', e.target.value)}
            />
            <button onClick={this.handlePasswordUpdate}>Update Password</button>
          </div>
        )}
        {showProfileUpdate && (
          <div>
            <h3>Update Profile Information</h3>
            <input
              type="text"
              placeholder="First Name"
              value={this.state.firstName}
              onChange={(e) => this.handleInputChange('firstName', e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={this.state.lastName}
              onChange={(e) => this.handleInputChange('lastName', e.target.value)}
            />
            <input
              type="text"
              placeholder="Phone"
              value={this.state.phone}
              onChange={(e) => this.handleInputChange('phone', e.target.value)}
            />
            <input
              type="text"
              placeholder="Address"
              value={this.state.address}
              onChange={(e) => this.handleInputChange('address', e.target.value)}
            />
            <input
              type="text"
              placeholder="Organization"
              value={this.state.organization}
              onChange={(e) => this.handleInputChange('organization', e.target.value)}
            />
            <button onClick={this.handleProfileUpdate}>Update Profile</button>
          </div>
        )}
      </div>
    );
  }
}

export default UserProfile;
