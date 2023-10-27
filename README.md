# Instaviagem Backend Challenge

# Challenge

A challenge that should return the possible trip dates given a desired trip date range and trip minimum and maximum days.

# How to run

To start you should install the dependencies first:

```zsh
foo@bar:~$ npm i
ou
foo@bar:~$ yarn
```

Then you can run the application with the following command:

```zsh
foo@bar:~$ npm run dev
ou
foo@bar:~$ yarn dev
```

To modify the ranges of dates you can simply alter the `testInput` variable in the line `33`:

```typescript
{
  vacation: {
    vacationStartDate: '2024-06-01',
    vacationEndDate: '2024-06-30'
  },
  desiredTripDuration: {
    minDays: 5,
    maxDays: 10
  }
}
```

The result of the check is going to be displayed in the `testResponse.json` file in the root directory.

:warning: To confirm the modifications and update a file, you should save the code so that it automatically respawn the app.
