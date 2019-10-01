# Testes

Lista de sugestões para testar:

- Componentes baseados em classe
- Componentes funcionais
- Componentes conectados ao redux
- Reducers
- Actions

## Componentes

### Baseados em classe

Testar componentes baseados em classe é bem simples, visto que você tem acesso às propriedades da instância no objeto.

#### Unidades simples
Testando se uma _function as prop_ foi chamada:

```javascript
import React, { Component } from 'react'
import { render } from '@testing-library/react'

class MyComponent extends Component {
    componentDidMount() {
        this.props.functionAsProp()
    }

    render() {
        return <div>Hello, World.</div>
    }
}

it('runs functionAsProp on component mount', () => {
    const mockedFunctionAsProp = jest.fn()
    render(<MyComponent functionAsProp={mockedFunctionAsProp} />)
    expect(mockedFunctionAsProp).toHaveBeenCalledTimes(1)
})
```

Testando um método como unidade:

```javascript
import React, { Component } from 'react'

class MyComponent extends Component {
    greet(name) {
        return `Hello, ${name}!`
    }

    render() {
        return <div>{this.greet('World')}</div>
    }
}

it('greet method should return correct value', () => {
    const component = new MyComponent()
    const result = component.greet('World')
    expect(result).toBe('Hello, World!')
})
```

e se for assíncrono:

```javascript
import React, { Component } from 'react'

class MyComponent extends Component {
    greet(name) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(`Hello, ${name}!`)
            }, 150)
        })
    }

    render() {
        return <div>{this.greet('World')}</div>
    }
}

it('greet method should return correct value', async () => {
    const component = new MyComponent()
    const result = await component.greet('World')
    expect(result).toBe('Hello, World!')
})
```

#### Unidades relativas

Verificando se um método é executado ao disparar algum evento do DOM.

```javascript
import React, { Component } from 'react'
import { render, act, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

class MyComponent extends Component {
    state = {
        name: ''
    }

    handleChange = e => {
        this.setState({
            name: e.target.value
        })
    }

    render() {
        return <>
            <input
                data-testid={"input-name"}
                type={"text"}
                placeholder={"name"}
                value={this.name}
                onChange={this.handleChange}
            />
        </>
    }
}

it('should update input value on change', async () => {
    const { getByTestId } = render(<MyComponent />)
    act(() => {
        fireEvent.change(getByTestId('input-name'), { target: { value: 'foo' }})
    })

    // note que esperamos que o valor do input seja foo
    // e não que o estado do componente contenha foo
    expect(getByTestId('input-name')).toHaveValue('foo')
})
```

Verificando a alteração de algo no DOM ao disparar um evento:

```javascript
import React, { Component } from 'react'
import { render, act, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

class MyComponent extends Component {
    state = {
        showDiv: ''
    }

    handleClick = e => {
        e.preventDefault()
        this.setState({
            showDiv: !this.state.showDiv
        })
    }

    render() {
        return <>
            {this.state.showDiv ?
                <div data-testid={"togglable-div"}>
                    {'I\'m here'}
                </div> : ''
            }
            <button
                data-testid="toggle-div"
                onClick={this.handleClick}
            >
                {'Toggle'}
            </button>
        </>
    }
}

it('should update input value on change', async () => {
    const { getByTestId } = render(<MyComponent />)
    const preventDefault = jest.fn()
    act(() => {
        fireEvent.click(getByTestId('toggle-div'), { preventDefault })
    })

    expect(getByTestId('togglable-div')).toBeInTheDocument()
})
```
