import repositories from "../../repositories";

async function getCardRecharges(id: number) {
    return await repositories.rechargeRepository.findByCardId(id);
}

const rechargeServices = {
    getCardRecharges,
};

export default rechargeServices;