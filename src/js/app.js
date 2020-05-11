let modalQt = 1

pizzaJson.map((item, index) => {
    const pizzaItem = QS('.models .pizza-item').cloneNode(true)

    pizzaItem.setAttribute('data-key', index)
    pizzaItem.querySelector('.pizza-item--img img').src = item.img
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description

    pizzaItem.querySelector('.pizza-item--link').addEventListener('click', (e) => {
        e.preventDefault()

        modalQt = 1

        let key = e.target.closest('.pizza-item').getAttribute('data-key')

        QS('.pizzaBig img').src = pizzaJson[key].img
        QS('.pizzaInfo h1').innerHTML = pizzaJson[key].name
        QS('.pizzaInfo--desc').innerHTML = pizzaJson[key].description
        QS('.pizzaInfo--actualPrice').innerHTML = pizzaJson[key].price.toFixed(2)
        QS('.pizzaInfo--size.selected').classList.remove('selected')
        QSA('.pizzaInfo--size').forEach((size, sizeIndex) => {
            (sizeIndex == 2) ? size.classList.add('selected') : ''
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]
        })

        QS('.pizzaInfo--qt').innerHTML = modalQt

        QS('.pizzaWindowArea').style.opacity = 0
        QS('.pizzaWindowArea').style.display = "flex"
        setTimeout(() => {
            QS('.pizzaWindowArea').style.opacity = 1
        }, 200)
    })

    QS('.pizza-area').append(pizzaItem)
})

const closeModal = () => {
    QS('.pizzaWindowArea').style.opacity = 0
    QS('.pizzaWindowArea').style.display = "none"
    setTimeout(() => {
        QS('.pizzaWindowArea').style.opacity = 1
    }, 500)
}

QSA('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton')
    .forEach(item => item.addEventListener('click', closeModal))

QS('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if(modalQt > 1) {
        modalQt--
        QS('.pizzaInfo--qt').innerHTML = modalQt
    }
})

QS('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQt++
    QS('.pizzaInfo--qt').innerHTML = modalQt
})

QSA('.pizzaInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', () => {
        QS('.pizzaInfo--size.selected').classList.remove('selected')
        size.classList.add('selected')
    })
})
