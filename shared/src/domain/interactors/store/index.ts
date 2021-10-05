import CardRepository, { FetchParams } from '~/domain/repositories/store'

export default class CardInteraction {
  constructor(private _cardRepository: CardRepository) {}

  fetchList(params: FetchParams) {
    return this._cardRepository.fetchList(params)
  }

  getById(id: number) {
    return this._cardRepository.getById(id)
  }
}
