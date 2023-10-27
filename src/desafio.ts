import fs from 'fs'
import { utc } from 'moment'

type TripDates = {
  tripStartDate: string // YYYY-MM-DD
  tripEndDate: string // YYYY-MM-DD
  duration: number // In days
}

type GetTripDatesPossibilities = {
  vacation: Vacation
  desiredTripDuration: DesiredTripDuration
}

type Vacation = {
  vacationStartDate: string // YYYY-MM-DD
  vacationEndDate: string // YYYY-MM-DD
}

type DesiredTripDuration = {
  minDays: number
  maxDays: number
}

// The challenge is to implement the function below.
// Let's suppose that the user wants to take a vacation
// between 2024-06-01 and 2024-06-30.
// The user wants to take a trip that lasts between 5 and 10 days.
// The function should return a list of all TripDates possibilities
// that fit the given vacation and desired trip duration.
// The expected response would be an array with 135 possibilities:

const testInput: GetTripDatesPossibilities = {
  vacation: {
    vacationStartDate: '2024-06-01',
    vacationEndDate: '2024-06-30'
  },
  desiredTripDuration: {
    minDays: 5,
    maxDays: 10
  }
}

/**
  This function should return a list of TripDates
  possibilities that fit the given vacation and desired trip duration.
 */
function getTripDatesPossibilities({
  vacation,
  desiredTripDuration
}: GetTripDatesPossibilities): TripDates[] {
  const tripDates: TripDates[] = []

  validateIfEndDateIsBiggerThanStartDate(vacation.vacationStartDate, vacation.vacationEndDate)

  validateIfMinimunDesiredTripDurationIsInTheRangeOfTheVacationStartAndEndDate(
    vacation.vacationStartDate,
    vacation.vacationEndDate
  )

  validateIfMaximumDeisredTripDurationIsBiggerThanMinimunTripDuration(desiredTripDuration)

  let tripStartDate = vacation.vacationStartDate
  let tripEndDate = vacation.vacationEndDate

  for (
    let duration = desiredTripDuration.minDays;
    duration <= desiredTripDuration.maxDays;
    duration
  ) {
    tripEndDate = dateSumDays(tripStartDate, duration)

    if (diffDays(tripEndDate, vacation.vacationEndDate) < 0) {
      duration++
      tripStartDate = vacation.vacationStartDate
      tripEndDate = vacation.vacationEndDate

      continue
    }

    tripDates.push({
      duration,
      tripStartDate,
      tripEndDate
    })

    tripStartDate = dateSumDays(tripStartDate, 1)
  }

  return tripDates
}

// #### Auxiliary functions. Feel free to use them if necessary. ####

const testResponse = getTripDatesPossibilities(testInput)
generateResponseFile(testResponse)

/**
 * Function that generates the test response file
 */
function generateResponseFile(tripDates: TripDates[]): void {
  console.log('Generating file...')
  fs.writeFileSync('./testResponse.json', JSON.stringify(tripDates, null, 2))
  console.log('File generated successfully!')
}

/**
  Function that returns the difference between two dates in days
 */
function diffDays(departureDate: string, returnDate: string): number {
  return utc(returnDate, 'YYYY-MM-DD').diff(utc(departureDate, 'YYYY-MM-DD'), 'd')
}

/**
  Function that returns the date string (YYYY-MM-DD format) after adding the given amount of days
 */
function dateSumDays(date: string, days: number): string {
  return utc(date, 'YYYY-MM-DD').add(days, 'd').format('YYYY-MM-DD')
}

/**
 * Function that validates if the return date is at least one day bigger than the departure date
 */
function validateIfEndDateIsBiggerThanStartDate(departureDate: string, returnDate: string): void {
  if (diffDays(departureDate, returnDate) <= 0) {
    throw new Error('End date should be at least ONE day after the start date.')
  }
}

/**
 * Function that validates if the minimun desired trip duration is in the range of the departure and
 * return date
 */
function validateIfMinimunDesiredTripDurationIsInTheRangeOfTheVacationStartAndEndDate(
  departureDate: string,
  returnDate: string
): void {
  if (diffDays(departureDate, returnDate) <= 0) {
    throw new Error(
      'Minimum desired trip duration should be in the range of the vacation start and end date.'
    )
  }
}

/**
 * Function that validates if the maximum desired trip duration is bigger than the minimun.
 */
function validateIfMaximumDeisredTripDurationIsBiggerThanMinimunTripDuration({
  minDays,
  maxDays
}: DesiredTripDuration): void {
  if (minDays > maxDays) {
    throw new Error('Minimun desired trip duration should not be bigger than max trip duration.')
  }
}
