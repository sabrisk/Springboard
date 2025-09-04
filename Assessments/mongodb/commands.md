### Create

## 1. **Insert a New Document into the Users Collection. Practice adding a new user document to the users collection. Include fields name and email.**

```
Clicked Add Data > Insert Document
{
  "name": "Brock Keasler",
  "email": "Brock@test.com"
}
```

### Read

## 1. Find all movies directed by Christopher Nolan.

```
Filter: { directors: "Christopher Nolan" }

Project: { title: 1, _id: 0 }
```

## 2. Find movies that include the genre "Action" and sort (descending) them by year.

```
Filter: { genres: "Action" }

Project: {title:1, _id:0}

Sort: { year: -1 }
```

## 3. Find movies with an IMDb rating greater than 8 and return only the title and IMDB information.

```
Filter: {"imdb.rating":{"$gt":8}}

Project: {title:1, imdb:1, "_id":0}
```

## 4. Find movies that starred both "Tom Hanks" and "Tim Allen".

```
Filter: {cast:{$all:["Tom Hanks","Tim Allen"]}}

Project: { title: 1, _id: 0 }
```

## 5. Find movies that starred both and only "Tom Hanks" and "Tim Allen".

```
Filter: {"cast": { "$all": ["Tom Hanks", "Tim Allen"], "$size": 2 }}

Project: {title:1,"_id":0}
```

## 6. Find comedy movies that are directed by Steven Spielberg.

```
Filter: {genres: "Comedy",directors: "Steven Spielberg"}

Project: {title:1,"_id":0}
```

### Update

## 1. Add a new field "available_on" with the value "Sflix" to "The Matrix".

```
Filter: { "title": "The Matrix" }

Update JSON dialog box: { $set: { available_on: "Sflix" } }
```

## 2. Increment the metacritic of "The Matrix" by 1.

```
Filter: { "title": "The Matrix" }

Update JSON dialog box: { $inc: {metacritic:1}}
```

## 3. Add a new genre "Gen Z" to all movies released in the year 1997.

```
This filter doesn't work and I don't know why. I can't update it if I can't get this to work.

{ "released": { "$gt": new Date("1997-12-31")}}
```

## 4. Increase IMDb rating by 1 for all movies with a rating less than 5.

```
Filter: { 'imdb.rating': { $lt: 5 } }

Update JSON dialog box: {$inc:{"imdb.rating":1}}
```

### Delete

## 1. Delete a comment with a specific ID.

```
Filter: { _id: ObjectId('5a9427648b0beebeb6957ba5') }

Clicked Delete Button
```

## 2. Delete all comments made for "The Matrix".

```
First get the id

Filter: { title: 'The Matrix' }

Project: {_id: 1}

Then perform the delete with the id

Filter: { movie_id: ObjectId('573a139bf29313caabcf3d23') }

Click delete button

Then update num_mflix_comments to be 0 in movies for 'The Matrix'
Filter:

Filter: { title: 'The Matrix' }

Update JSON dialog box {$set: {num_mflix_comments:0}}
```

## 3. Delete all movies that do not have any genres.

```
Filter:
{
  $or: [
    { genres: { $size: 0 } },
    { genres: { $exists: false } },
    { genres: null }
  ]
}

Clicked Delete Button
```

### Aggregate

## 1. Aggregate movies to count how many were released each year and display from the earliest year to the latest.

```
I used the aggregations tab and had to google how to do this. I don't think the videos taught us how to do this.

[
  {
    $project: {
      released: {
        $year: "$released"
      }
    }
  },
  {
    $group: {
      _id: "$released",
      numMovies: {
        $sum: 1
      }
    }
  },
  {
    $sort: {
      _id: 1
    }
  }
]
```

## 2. Calculate the average IMDb rating for movies grouped by director and display from highest to lowest.

```
I used the aggregations tab and had to google how to do this. I don't think the videos taught us how to do this.
[
  {
    $unwind: "$directors"
  },
  {
    $group: {
      _id: "$directors",
      avgRating: {
        $avg: "$imdb.rating"
      }
    }
  },
  {
    $sort: {
      avgRating: -1
    }
  },
  {
    $project: {
      director: "$_id",
      avgRating: 1,
      _id: 0
    }
  }
]
```
