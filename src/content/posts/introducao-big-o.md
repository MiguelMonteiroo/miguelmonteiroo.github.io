---
title: "Introdução a Big O Notation"
tags: ["algoritmos"]
---

Meu primeiro post técnico! Decidi iniciar escrevendo sobre o que estou estudando no curso de algoritmos e estruturas de dados do monstro Augusto Galego (um abraço!). Caso encontre algum erro, pode me dar um alô. Espero que goste :)

## O que é?

Big O é uma notação utilizada para definir a escalabilidade de um algoritmo, ou seja, o quão bem ele lida com o aumento da entrada de dados (*input*).

## Como Big O mede essa escalabilidade?

Para isso, são analisados dois tipos de complexidade:

- **Complexidade temporal:** a quantidade de operações a serem realizadas.
- **Complexidade espacial:** a quantidade de memória utilizada ou alocada.

## Exemplo

Imagine um algoritmo que recebe um array, busca por um valor `x` e retorna seu índice quando o encontra.

```python
def find_index(array, target):
    for index, value in enumerate(array):
        if value == target:
            return index

    return -1
```

Aqui entra um detalhe importante: a notação Big O geralmente é analisada considerando o pior caso, ou seja, aquele em que o algoritmo precisa realizar o maior número de operações para atingir seu objetivo.

**Melhor caso:** o elemento procurado é o primeiro do array (`find_index([2, 7, 5, 6, 9], 2)`).

![Exemplo visual do melhor caso em uma busca linear](/images/posts/introducao-big-o/linear-best-case.png)

**Pior caso:** é necessário percorrer todo o array (`find_index([9, 7, 2, 5, 6], 6)`).

![Exemplo visual do pior caso em uma busca linear](/images/posts/introducao-big-o/linear-worst-case.png)

Nesse caso, o pior cenário seria percorrer todo o array até encontrar o elemento ou confirmar que ele não está presente. A esse tipo de **complexidade temporal** damos o nome de `O(n)`, ou **complexidade linear**, pois a quantidade de operações cresce linearmente em função da entrada.

![Curva de crescimento da complexidade linear O(n)](/images/posts/introducao-big-o/linear-complexity-curve.png)

Já a **complexidade espacial** desse algoritmo é chamada de **constante** ou `O(1)`, pois não há alocação de memória proporcional ao tamanho da entrada (nesse caso, o índice do valor desejado é retornado diretamente).

![Linha de crescimento da complexidade constante O(1)](/images/posts/introducao-big-o/constant-complexity-line.png)

Um exemplo de algoritmo com complexidade espacial `O(n)` seria um que recebe um array e retorna o dobro de cada elemento dele, pois, para cada elemento adicionado à entrada, será necessária uma alocação de memória a mais (o valor do dobro desse elemento).

```python
def double_values(array):
    doubled_values = []

    for value in array:
        doubled_values.append(value * 2)

    return doubled_values
```


**Obs.:** Essa notação não mede o tempo real de execução, mas o crescimento do custo do algoritmo conforme a entrada aumenta. Por isso, isoladamente, ela não é suficiente para determinar qual algoritmo terá melhor desempenho, apenas qual algoritmo tende a escalar melhor.

## Principais complexidades

Geralmente, quando falamos de complexidade de algoritmos, estamos nos referindo à complexidade temporal. Então, a partir de agora, considere esse contexto.

### Complexidade constante (`O(1)`)

Acontece quando o número de operações se mantém o mesmo, independentemente do tamanho da entrada. Exemplo: verificar o primeiro elemento de uma lista.

### Complexidade logarítmica (`O(log n)`)

Acontece quando o número de operações cresce de forma logarítmica em relação ao tamanho da entrada.

Para visualizar melhor, podemos observar alguns logaritmos na base 2, que é a base mais comum quando falamos de Big O:

```txt
log2(4) = 2
log2(8) = 3
log2(16) = 4
log2(32) = 5
```

É possível observar que, a cada vez que dobramos a entrada, o resultado do logaritmo aumenta em apenas 1. No nosso caso, esse resultado representa o número de operações realizadas pelo algoritmo.

Um exemplo clássico de algoritmo com complexidade logarítmica é a busca binária. Ela funciona em arrays ordenados, sempre comparando o elemento do meio com o valor procurado. Se o valor não for encontrado, metade dos elementos restantes é descartada.

```python
def binary_search(array, target):
    left = 0
    right = len(array) - 1

    while left <= right:
        middle = (left + right) // 2

        if array[middle] == target:
            return middle

        if array[middle] < target:
            left = middle + 1
        else:
            right = middle - 1

    return -1
```

### Complexidade linear (`O(n)`)

Acontece quando o número de operações cresce linearmente em relação ao tamanho da entrada. Exemplo: a função `find_index` do início desse texto.

### Complexidade linearítmica (`O(n log n)`)

Basicamente, é uma combinação de `O(n)` com `O(log n)`: o algoritmo percorre os elementos da entrada (`n`) e divide o problema em partes menores (`log n`). Geralmente essa complexidade aparece em algoritmos de ordenação e *divide and conquer*. Um exemplo é o algoritmo merge sort.

```python
def merge_sort(array):
    if len(array) <= 1:
        return array

    middle = len(array) // 2
    left = merge_sort(array[:middle])
    right = merge_sort(array[middle:])

    return merge(left, right)


def merge(left, right):
    result = []
    left_index = 0
    right_index = 0

    while left_index < len(left) and right_index < len(right):
        if left[left_index] <= right[right_index]:
            result.append(left[left_index])
            left_index += 1
        else:
            result.append(right[right_index])
            right_index += 1

    result.extend(left[left_index:])
    result.extend(right[right_index:])

    return result
```

### Complexidade quadrática (`O(n²)`)

Essa é simples de se entender, basta imaginar um loop dentro de outro loop. Para cada elemento da entrada, todos os outros elementos são verificados.

```python
def print_pairs(array):
    for i in array:
        for j in array:
            print(i, j)
```

### Outras complexidades

Complexidades menos comuns em algoritmos, mas que também existem.

- `O(2^n)`: complexidade exponencial
- `O(√n)`: complexidade de raiz quadrada
- `O(n!)`: complexidade fatorial (uma solução por força bruta para o Problema do Caixeiro Viajante é um bom exemplo dela).
