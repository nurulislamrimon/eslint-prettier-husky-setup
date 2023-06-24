// search and filter data=============
import { RequestHandler } from 'express'

export const getUsers: RequestHandler = (req, res, next) => {
  // get and pick fields from request
  const pick = <T, k extends keyof T>(obj: T, keys: k[]) => {
    const finalObj: Partial<T> = {}
    for (const key of keys) {
      if (obj && Object.hasOwnProperty.call(obj, key)) {
        finalObj[key] = obj[key]
      }
    }
    return finalObj
  }
  //   get filters using pick function
  const filters = pick(req.query, ['searchTerm', 'name', 'age', 'studentId'])
  const { searchTerm, ...filterFields } = filters
  // combination of gloabal and specific fields
  const andConditions = []

  // global search
  const searchableFields = ['name', 'age', 'studentId']

  if (searchTerm) {
    andConditions.push({
      $or: searchableFields.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    })
  }
  // cost {searchTerm}=filters
  if (Object.keys(filterFields).length) {
    andConditions.push({
      $and: Object.entries(filterFields).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }
  const result = andConditions
  res.send({
    status: 'success',
    data: result,
  })
}
