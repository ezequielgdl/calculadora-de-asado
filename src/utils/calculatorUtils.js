export const calculateMeatNeeded = (inputs) => {
  const meatPerAdult = 0.4; // For example, 0.5 kg of meat per adult
  const meatWithBonePerAdult = 0.5
  const meatPerChild = 0.15; // For example, 0.25 kg of meat per child
  const meatWithBonePerChild = 0.25
  const offalPerPerson = 0.2; // For example, 0.2 kg of offal per person

  let totalMeatWithoutBone = 0;
  let totalMeatWithBone = 0;
  let totalOffal = 0;

  switch (true) {
    case inputs.withBone && !inputs.withoutBone && !inputs.includeOffal:
      // Only with bone, no without bone, no offals
      totalMeatWithBone = inputs.adults * meatWithBonePerAdult + inputs.children * meatWithBonePerChild;
      break;

    case !inputs.withBone && inputs.withoutBone && !inputs.includeOffal:
      // Only without bone, no with bone, no offals
      totalMeatWithoutBone = inputs.adults * meatPerAdult + inputs.children * meatPerChild;
      break;

    case inputs.withBone && inputs.withoutBone && !inputs.includeOffal:
      // Both with bone and without bone, no offals
      totalMeatWithoutBone =
        (inputs.adults * meatPerAdult + inputs.children * meatPerChild) / 2
      totalMeatWithBone = 
        (inputs.adults * meatWithBonePerAdult + inputs.children * meatWithBonePerChild) / 2;
      break;

    case inputs.withBone && !inputs.withoutBone && inputs.includeOffal:
      // With bone and offals, no without bone
      totalOffal = ((inputs.adults + inputs.children) * offalPerPerson) * 0.3;
      totalMeatWithBone =
        (inputs.adults * meatWithBonePerAdult +
        inputs.children * meatWithBonePerChild) * 0.7
      break;

    case !inputs.withBone && inputs.withoutBone && inputs.includeOffal:
      // Without bone and offals, no with bone
      totalOffal = ((inputs.adults + inputs.children) * offalPerPerson) * 0.3;
      totalMeatWithoutBone =
        (inputs.adults * meatPerAdult +
        inputs.children * meatPerChild) * 0.7
      break;

    case inputs.withBone && inputs.withoutBone && inputs.includeOffal:
      // Both with bone, without bone, and offals
      totalOffal = ((inputs.adults + inputs.children) * offalPerPerson) * 0.3;
      totalMeatWithoutBone =
        ((inputs.adults * meatPerAdult +
        inputs.children * meatPerChild) * 0.7) / 2
      totalMeatWithBone =
        ((inputs.adults * meatWithBonePerAdult +
        inputs.children * meatWithBonePerChild) * 0.7) / 2
      break;

    default:
      // Default case if no conditions match (e.g., when no preferences are selected)
      break;
  }

  return {
    totalOffals: totalOffal.toFixed(1),
    meatWithBone: totalMeatWithBone.toFixed(1),
    meatWithoutBone: totalMeatWithoutBone.toFixed(1)
  }
};
