# Valex

Valex is a card creation app in which each registered company can register a card for your designed employee.

## Routes

### Create Card
```
POST(/card)

body: {
    "employeeId": someIntegerNumber,
    "type": "groceries"| "restaurant"| "transport"| "education"|"health"
}

headers: {
    "x-api-key": "companyApiKey" 
}

```

### Activate Card
```
PUT(/card/activate)
body: {
    "cardId": someIntegerNumber, 
    "password": "somePassword", 
    "cvc": someIntegerNumber
}

```

### Card Info
```
GET(/card/:id), where id is an integer

```

### Block Card
```
POST(/card/block)
body: {
    "cardId": someIntegerNumber,
    "password": "somePassword"
}

```

### Unblock Card
```
POST(/card/unblock)
body: {
    "cardId": someIntegerNumber,
    "password": "somePassword"
}

```

### Recharge Card
```
POST(/recharge)
body: {
    "cardId": someIntegerNumber, 
    "amount": someFloatNumber:F2
}
```

### Pay with Card
```
POST(/payment)
body: {
    "cardId": someIntegerNumber, 
    "amount": someFloatNumber:F2, 
    "password": "somePassword", 
    "businessId": someIntegerNumber 
}
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
UNLICENSED