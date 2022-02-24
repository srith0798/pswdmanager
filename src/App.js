import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'

const colorBg = ['a', 'b', 'c', 'd', 'e', 'f']

function PasswordItem(params) {
  const {listObj, check, removeFunc} = params
  const {userName, id, bgColor, password, siteName} = listObj
  const onDelete = () => {
    removeFunc(id)
  }
  return (
    <li className="pass-item">
      <h1 className={`initial ${bgColor}`}>{userName[0].toUpperCase()}</h1>
      <div className="user-box">
        <p className="user-info">{siteName}</p>
        <p className="user-info">{userName}</p>
        {check ? (
          <p className="user-info">{password}</p>
        ) : (
          <img
            className="stars-pic"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
          />
        )}
      </div>
      <button
        testid="delete"
        className="del-btn"
        onClick={onDelete}
        type="button"
      >
        <img
          className="del-logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

class App extends Component {
  state = {
    managerList: [],
    usernameIn: '',
    siteIn: '',
    pswdIn: '',
    check: false,
    searchValue: '',
  }

  getSite = event => {
    this.setState({
      siteIn: event.target.value,
    })
  }

  removeItem = id => {
    // console.log(id)
    const {managerList} = this.state
    const updateManageList = managerList.filter(each => each.id !== id)
    this.setState({
      managerList: updateManageList,
    })
  }

  getUser = event => {
    this.setState({
      usernameIn: event.target.value,
    })
  }

  getPswd = event => {
    this.setState({
      pswdIn: event.target.value,
    })
  }

  onAdd = event => {
    event.preventDefault()
    const {usernameIn, pswdIn, siteIn, managerList} = this.state
    const getRandom = colorBg[Math.ceil(Math.random() * colorBg.length) - 1]

    const userObj = {
      id: uuidv4(),
      userName: usernameIn,
      siteName: siteIn,
      password: pswdIn,
      bgColor: getRandom,
    }
    this.setState({
      managerList: [...managerList, userObj],
      usernameIn: '',
      siteIn: '',
      pswdIn: '',
    })
  }

  onReveal = () => {
    this.setState(prevState => ({
      check: !prevState.check,
    }))
  }

  onSearch = event => {
    const searchValue = event.target.value
    this.setState({
      searchValue,
    })
  }

  getRelevantData = () => {
    const {managerList, searchValue} = this.state
    console.log(searchValue)
    const filterList = managerList.filter(eachOne =>
      eachOne.siteName.toLowerCase().includes(searchValue),
    )
    return filterList
  }

  render() {
    const {pswdIn, check, usernameIn, searchValue, siteIn} = this.state
    // console.log(managerList)
    const filterList = this.getRelevantData()
    const count = filterList.length

    return (
      <div className="bg-layer">
        <div>
          <nav className="nav-menu">
            <img
              className="logo"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
              alt="app logo"
            />
          </nav>
          <div className="top-section">
            <div className="left-card">
              <h1 className="title"> Add New Password</h1>
              <form onSubmit={this.onAdd}>
                <div className="input-box">
                  <img
                    className="form-pic"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                  />
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Enter Website"
                    value={siteIn}
                    onChange={this.getSite}
                  />
                </div>
                <div className="input-box">
                  <img
                    className="form-pic"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                  />
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Enter Username"
                    value={usernameIn}
                    onChange={this.getUser}
                  />
                </div>
                <div className="input-box">
                  <img
                    className="form-pic"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                  />
                  <input
                    className="form-input"
                    type="password"
                    placeholder="Enter Password"
                    value={pswdIn}
                    onChange={this.getPswd}
                  />
                </div>
                <button className="btn" type="submit">
                  Add
                </button>
              </form>
            </div>
            <img
              className="section-pic"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
            />
          </div>
          <div className="bottom-section">
            <div className="header">
              <div className="text-box">
                <h1 className="title">Your Passwords</h1>
                <p className="count">{count}</p>
              </div>
              <div className="search-box">
                <img
                  className="search-pic"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                />
                <input
                  className="form-input"
                  type="search"
                  placeholder="Search"
                  value={searchValue}
                  onChange={this.onSearch}
                />
              </div>
            </div>
            <div className="toggle-bar">
              <input type="checkbox" value="checkbox" onClick={this.onReveal} />
              <label htmlFor="checkbox">Show passwords</label>
            </div>
            {count !== 0 ? (
              <ul className="manager-list">
                {filterList.map(eachItem => (
                  <PasswordItem
                    key={eachItem.id}
                    check={check}
                    removeFunc={this.removeItem}
                    listObj={eachItem}
                  />
                ))}
              </ul>
            ) : (
              <div className="message-section">
                <img
                  className="section-pic"
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                />
                <p className="title">No Passwords</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
