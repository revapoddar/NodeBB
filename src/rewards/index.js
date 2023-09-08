'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rewards = void 0;
exports.rewards = {};
exports.rewards.checkConditionAndRewardUser = function (params) {
    return __awaiter(this, void 0, void 0, function* () {
        const { uid, condition, method } = params;
        const isActive = yield isConditionActive(condition);
        if (!isActive) {
            return;
        }
        const ids = yield getIDsByCondition(condition);
        let rewardData = yield getRewardDataByIDs(ids);
        rewardData = yield filterCompletedRewards(uid, rewardData);
        rewardData = rewardData.filter(Boolean);
        if (!rewardData || !rewardData.length) {
            return;
        }
        const eligible = yield Promise.all(rewardData.map(reward => checkCondition(reward, method)));
        const eligibleRewards = rewardData.filter((reward, index) => eligible[index]);
        yield giveRewards(uid, eligibleRewards);
    });
};
