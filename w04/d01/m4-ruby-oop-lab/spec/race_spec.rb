require 'spec_helper'

RSpec.describe Race do
  let(:race) { Race.new }

  describe 'Methods' do
    describe '#initialize' do
      it 'instantiates two cars' do
        expect(race.cars.length).to eq 2
      end

      it 'accelerates the cars to random speeds' do
        expect(race.cars.first.speed).to_not eq 0
        expect(race.cars.last.speed).to_not eq 0
      end
    end

    describe '#winner' do
      it 'returns the winner' do
        expect(race.winner).to be_a Car
      end

      it 'is not the loser' do
        expect(race.winner).not_to eq race.loser
      end
    end

    describe '#loser' do
      it 'returns the loser' do
        expect(race.loser).to be_a Car
      end

      it 'is no the winner' do
        expect(race.loser).not_to eq race.winner
      end
    end
  end
end