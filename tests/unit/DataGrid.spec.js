import { mount} from '@vue/test-utils'
import axios from 'axios'
import { BASE_URL, getGames } from "./utils";

jest.mock("axios");

import DataGrid from '@/components/DataGrid.vue'
import Modal from '@/components/DataGrid.vue'

describe('DataGrid.vue', () => {
  it('DataGrid component\'s exist', () => {
    const wrapper = mount(DataGrid)

    expect(wrapper.findComponent(Modal).exists()).toBe(true)
  })
  it('renders games on creation', async() => {

    const mockGameList = [
      {id:1, name:"demo1", year:1999, publisher:"pub1"},
      {id:2, name:"demo2", year:2000, publisher:"pub2"}
    ]

    axios.get.mockResolvedValueOnce(mockGameList)

    const result = await getGames()

    expect(axios.get).toHaveBeenCalledTimes(3)
    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/games`)

    expect(result).toEqual(mockGameList)
  })
})