require 'car'

describe Car do
  let(:car) { Car.new }

  describe 'Attributes' do
    it { is_expected.to respond_to :speed }
  end

  describe 'Methods' do
    describe '#accelerate' do
      before { car.accelerate(20) }

      it 'accelerates by a given speed' do
        expect(car.speed).to eq 20
      end
      it 'accelerates by another 20' do
        car.accelerate(10)
        expect(car.speed).to eq 30
      end
    end

    describe '#initialize' do
      it 'sets the speed to 0' do
        expect(car.speed).to eq 0
      end
    end
  end
end