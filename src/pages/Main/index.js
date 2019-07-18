import React, { Component } from 'react'
import { FaGitAlt, FaPlus, FaSpinner } from 'react-icons/fa'

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
    const { newRepo } = this.state

    this.setState({ loading: true })

    const reponse = await api.get(`/repos/${newRepo}`)

    const data = {
      name: reponse.data.full_name,
    }

    this.setState({
      repositories: [...this.state.repositories, data],
      newRepo: '',
      loading: false
    })
  }

  render(){

    const { newRepo, loading, repositories } = this.state

    return (
      <>
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

          <SubmitButton loading={loading ? 1 : 0 }>
            {
              loading
              ? <FaSpinner color="#fff" size={14}/>
              : <FaPlus color="#fff" size={14}/>
            }
          </SubmitButton>
        </Form>
      </Container>
      {
        repositories.map(repo => (<h1 key={repo.name}>{repo.name}</h1>))
      }
      </>
    )
  }
}
