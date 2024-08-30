import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { PrismaMeasuresRepository } from '@/repositories/prisma'
import { MEASURE_TYPES, type MeasureType } from '@/repositories/types'
import { ListMeasuresService } from '@/services'

const paramSchema = z.object({
  customer_code: z.string({ message: 'Código do usuário inválido' }),
})

const querySchema = z.object({
  measure_type: z
    .string()
    .transform((data) => data.toUpperCase())
    .refine((data) => MEASURE_TYPES.includes(data as MeasureType), {
      message: 'Tipo de medição não permitida',
      path: ['INVALID_TYPE'],
    })
    .optional(),
})

type ParamSchema = z.infer<typeof paramSchema>
type QuerySchema = z.infer<typeof querySchema>

export async function listMeasuresController(
  request: FastifyRequest<{ Params: ParamSchema; Querystring: QuerySchema }>,
  reply: FastifyReply,
) {
  const { customer_code } = paramSchema.parse(request.params)
  const { measure_type } = querySchema.parse(request.query)
  const measureType = measure_type as MeasureType

  const measuresRepository = new PrismaMeasuresRepository()
  const confirmMeasureService = new ListMeasuresService(measuresRepository)
  const response = await confirmMeasureService.execute({
    customer_code,
    measure_type: measureType,
  })

  return reply.status(200).send(response)
}
