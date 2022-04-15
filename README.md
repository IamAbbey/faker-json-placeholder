## Faker JSON Placeholder

---

Faker JSON Placeholder is a simple fake REST API server for quick testing, prototyping and mocking.
<br><br>
## Is this different from the common JSONPlaceholder? ###

Think of this as JSONPlaceholder on steroids, providing extensive and configurable JSON fake responses.
<br><br>
## Endpoints ###

<table style="width:100%;">
<tr>
<td> Endpoints </td> <td> Query Parameter </td> <td> Response </td>
</tr>
<tr>
<td> 
/api/faker <br>

[try it](http://127.0.0.1:3000/api/faker)
</td> 
<td>

- **keys** <br>
  Specifies the keys you want in your JSON response.
  e.g: name, age or [call a faker function using the double underscore (\_\_) format](#calling-a-faker-function) <br><br>
- **limit** <br>
  Specifies the amount of data response you want <br><br>
- **[schema](#predefined-schema)** <br>
Specifies to use one of our predefined schema instead of specifying your own keys
</td> 
<td> Responds with a single faker JSON object with the keys specified in the query parameter or using a predefined schema</td>
</tr>
<tr>
<td> /api/faker/:id </td> 
<td>

- **keys** <br>
  Specifies the keys you want in your JSON response.
  e.g: name, age or [call a faker function using the double underscore (\_\_) format](#calling-a-faker-function) <br><br>
- **[schema](#predefined-schema)** <br>
Specifies to use one of our predefined schema instead of specifying your own keys
</td> 
<td> Responds with a single faker JSON object with the keys specified in the query parameter or using a predefined schema</td>
</tr>
</table>
<br><br>

## Calling a faker function

To call a faker function using the keys query parameter, you are to use the double underscore \_\_ format like this <module_name>__<method_name>. <br>

An in-depth overview of the different methods is available in the [fakerjs documentation](https://fakerjs.dev/guide/). Below are some of modules available:

| Module   | Example                        | Output                                                                                                                                                                                                                  |
| -------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Address  | `address__city`         | Lake Raoulfort                                                                                                                                                                                                          |
| Animal   | `animal__type`          | Dog, cat, snake, bear, lion, etc.                                                                                                                                                                                       |
| Commerce | `commerce__product`     | Polo t-shirt                                                                                                                                                                                                            |
| Company  | `company__companyName`  | Zboncak and Sons                                                                                                                                                                                                        |
| Database | `database__engine`      | MyISAM                                                                                                                                                                                                                  |
| Datatype | `datatype__uuid`        | 7b16dd12-935e-4acc-8381-b1e457bf0176                                                                                                                                                                                    |
| Date     | `date__past`            | Sat Oct 20 2018 04:19:38 GMT-0700 (Pacific Daylight Time)                                                                                                                                                                                          |
| Git      | `git__commitMessage`    | feat: add products list page                                                                                                                                                                                            |
| Hacker   | `hacker__phrase`        | Try to reboot the SQL bus, maybe it will bypass the virtual application!                                                                                                                                |
| Image    | `image__avatar`         | `https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/233.jpg` <img src="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/233.jpg" width="64"/> |
| Internet | `internet__color`       | #630c7b                                                                                                                                                                                                                 |
| Lorem    | `lorem__paragraph`      | Word, words, sentences, slug (lorem-ipsum), paragraph(s), text, lines                                                                                                                                                   |
| Music    | `music__genre`          | R&B                                                                                                                                                                                                                     |
| Name     | `name__firstName`       | Cameron                                                                                                                                                                                                                 |
| Phone    | `phone__phoneNumber`    | +1 291-299-0192                                                                                                                                                                                                         |
| Random   | `random__locale`        | fr_CA                                                                                                                                                                                                                   |
| System   | `system__directoryPath` | C:\Documents\Newsletters\        |                                                                                                     

<br>
Allowing this kind of query parameter opens up a wide range with which you can customize your response. <br>
For more information about the different functions you can call check out the official

<br><br>

## Predefined Schema 

<table style="width:100%;">
<tr>
<td width="25%"> Schema Name </td> <td> Expected Schema Sample </td>
</tr>
<tr>
<td> 
post | posts <br>

*(default)*
</td> 
<td>


```json
{
  "id": 1,
  "title": "Nihil possimus ut beatae dicta nulla eaque sapiente.",
  "body": "Fuga ea repellendus iste eaque ut sed velit eum consequatur.",
  "userId": 1,
  "createdBy": "Stewart Jaskolski",
  "createdDate": "2022-04-15T15:27:21.885Z"
}
```

</td>
</tr>
<tr>
<td> todo | todos </td> 
<td>


```json
{
  "id": 1,
  "title": "Nobis rem nam et voluptate.",
  "completed": true,
  "userId": 1,
  "completedDate": "2022-04-14T09:19:24.514Z"
}
```

</td>
</tr>
<tr>
<td> quote | quotes </td> 
<td>


```json
{
  "id": 1,
  "body": "Aperiam perspiciatis rerum fugit distinctio.",
  "author": "Abel Leffler",
  "tags": [
    "explicabo",
    "earum",
    "odio"
  ]
}
```

</td>
</tr>
<tr>
<td> ecommerce | product | products </td> 
<td>


```json
{
  "id": 1,
  "name": "Car",
  "description": "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
  "price": "329.00",
  "color": "red",
  "imageURL": "http://loremflickr.com/640/480/abstract"
}
```

</td>
</tr>
<tr>
<td> user | users | person </td> 
<td>


```json
{
  "id": 1,
  "name": "Jim Medhurst",
  "email": "Nolan.Herzog45@gmail.com",
  "address": {
    "street": "272 Kulas Glen",
    "city": "West Elyssachester",
    "zipcode": "68120",
    "geo": {
      "lat": "81.4015",
      "lng": "-98.9926"
    }
  },
  "phone": "(575) 415-0764 x4389",
  "website": "fuzzy-avalanche.org",
  "company": {
    "name": "Collier, Schneider and Kris",
    "bs": "matrix real-time platforms"
  }
}
```

</td>
</tr>
</table>

## Credits

This system made use of [@faker-js/faker](https://fakerjs.dev/) extensively and it was inspired by [JSONPlaceholder](https://jsonplaceholder.typicode.com/) 
