import React, { Component } from 'react'
import { FaGitAlt, FaPlus } from 'react-icons/fa'

import api from '../../services/api'
import { Container, Form, SubmitButton } from './styles'

export default class Main extends Component {
  state = {
    newRepo: 'jhemyson/estudo-react',
    repositories: [],
    loading: false
  }

  addRepositorie = e => {
    this.setState({ newRepo: e.target.value })
  }

  handleSubmit = async e => {
    e.preventDefault()

    this.setState({ loading: true })

    console.log(this.state.loading)

    const reponse = await api.get(`/repos/${this.state.newRepo}`)

    const data = {
      name: reponse.data.full_name,

    }

    this.setState({
      repositories: [...this.state.repositories, data],
      newRepo: '',
      loading: false
    })

    console.log(this.state)
  }

  render(){

    const { newRepo } = this.state

    return (
      <Container>
        <h1>
          <FaGitAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onChange={this.addRepositorie}
          />

          <SubmitButton>
            <FaPlus color="#fff" size={14}/>
          </SubmitButton>
        </Form>

      </Container>
    )
  }
}
