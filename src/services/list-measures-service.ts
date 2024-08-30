import { MeasuresNotFoundError } from '@/http/errors'
import type { MeasuresRepository } from '@/repositories'
import type { Measure, MeasureType } from '@/repositories/types'

interface ListMeasuresServiceRequest {
  customer_code: string
  measure_type?: MeasureType
}

interface ListMeasuresServiceResponse {
  customer_code: string
  measures: Measure[]
}

export class ListMeasuresService {
  constructor(private measuresRepository: MeasuresRepository) {}

  async execute({
    customer_code,
    measure_type,
  }: ListMeasuresServiceRequest): Promise<ListMeasuresServiceResponse> {
    const measures = await this.measuresRepository.findManyByCustomerCode({
      customer_code,
      measure_type,
    })

    if (measures.length <= 0) {
      throw new MeasuresNotFoundError()
    }

    return { customer_code, measures }
  }
}
