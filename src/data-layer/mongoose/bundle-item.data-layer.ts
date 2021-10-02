import { FilterQuery } from 'mongoose';
import { IBundleItem } from '~/interfaces/bundle-item.interface';
import BundleItem from '~/models/BundleItem';

const createBundleItem = ({
	args = {},
}: {
	args: FilterQuery<IBundleItem>;
}): Promise<IBundleItem> => {
	return BundleItem.create(args).then((result) => result.save());
};

export { createBundleItem };
