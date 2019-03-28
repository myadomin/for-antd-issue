import React, { Component } from 'react'
import { Tree, List, Icon, message, Avatar } from 'antd'
import './index.css'

class App extends Component {
  constructor (props, context) {
    super(props)
    this.state = {
      expandedKeys: ['0-0-0', '0-0-1'],
      autoExpandParent: true,
      checkedNodes: [],
      checkedKeys: []
    }
  }

  onExpand = (expandedKeys) => {
    console.log('onExpand', expandedKeys)
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false
    })
  }

  onCheck = (checkedKeys, {checked, checkedNodes, halfCheckedKeys, node}) => {
    const newCheckedNodes = checkedNodes.filter(obj => obj.props.dataRef.isLeaf).map(obj => {
      return {
        key: obj.props.dataRef.key,
        title: obj.props.dataRef.title
      }
    })
    console.log(newCheckedNodes)
    this.setState({
      checkedNodes: newCheckedNodes,
      checkedKeys: newCheckedNodes.map(obj => obj.key)
    })
  }

  renderTreeNodes = (data) => data.map((item) => {
    if (item.children) {
      return (
        <Tree.TreeNode title={item.title} key={item.key} dataRef={item}>
          {this.renderTreeNodes(item.children)}
        </Tree.TreeNode>
      )
    }
    return <Tree.TreeNode title={item.title} key={item.key} dataRef={item} />
  })

  deleteChecked = (item) => {
    const newCheckedNodes = this.state.checkedNodes.filter(obj => obj.key !== item.key)
    console.log(newCheckedNodes)
    this.setState({
      checkedNodes: newCheckedNodes,
      checkedKeys: newCheckedNodes.map(obj => obj.key)
    })
  }

  render () {
    const treeData = [{
      title: 'title0-0',
      key: '0-0',
      children: [{
        title: 'title0-0-0',
        key: '0-0-0',
        children: [
          { title: 'title0-0-0-0', key: '0-0-0-0', isLeaf: true },
          { title: 'title0-0-0-1', key: '0-0-0-1', isLeaf: true },
          { title: 'title0-0-0-2', key: '0-0-0-2', isLeaf: true }
        ]
      }, {
        title: 'title0-0-1',
        key: '0-0-1',
        children: [
          { title: 'title0-0-1-0', key: '0-0-1-0', isLeaf: true },
          { title: 'title0-0-1-1', key: '0-0-1-1', isLeaf: true },
          { title: 'title0-0-1-2', key: '0-0-1-2', isLeaf: true }
        ]
      }, {
        title: 'title0-0-2',
        key: '0-0-2',
        isLeaf: true
      }]
    }, {
      title: 'title0-1',
      key: '0-1',
      children: [
        { title: 'title0-1-0-0', key: '0-1-0-0', isLeaf: true },
        { title: 'title0-1-0-1', key: '0-1-0-1', isLeaf: true },
        { title: 'title0-1-0-2', key: '0-1-0-2', isLeaf: true }
      ]
    }, {
      title: 'title0-2',
      key: '0-2',
      isLeaf: true
    }]
    return (
      <div className="app">
        <div className="treeWrap">
          <Tree
            checkable
            onExpand={this.onExpand}
            expandedKeys={this.state.expandedKeys}
            autoExpandParent={this.state.autoExpandParent}
            onCheck={this.onCheck}
            checkedKeys={this.state.checkedKeys}
          >
            {this.renderTreeNodes(treeData)}
          </Tree>
        </div>
        <div className="list">
          <List
            bordered
            dataSource={this.state.checkedNodes}
            renderItem={item => (
              <List.Item style={{justifyContent: 'space-between'}}>
                <span>{item.title}</span>
                <span><Icon type="close" onClick={() => this.deleteChecked(item)} /></span>
              </List.Item>
            )}
          />
        </div>
      </div>
    )
  }
}

export default App
