import { HomeworkSteps } from '../page-objects/steps/HomeworkSteps';

fixture`Homework`.page`https://catalog.onliner.by`;

test('Homework test', async () => {

    // 1. Open category 'Mobile phones'. 
    // Check that it opened.
    await HomeworkSteps.openMobileCatalog();
    await HomeworkSteps.checkOpenMobileCatalog();

    // 2. Find any two phones from the first 10 and add they to compare. 
    // Check the compare link exists, checkboxes set.
    let firstProduct = await HomeworkSteps.addRandomProductToCompare(10);
    let secondProduct = await HomeworkSteps.addRandomProductToCompare(10);
    await HomeworkSteps.checkCompareLink();
    await HomeworkSteps.checkCompareCheckbox(firstProduct, secondProduct);

    // 3. Set search parameters: price (min and max), screen size (min and max) - equal to max and min parameters of selected phones.
    // Check that selected phones still displayed and checkboxes checked.
    await HomeworkSteps.setPrice(firstProduct, secondProduct);
    await HomeworkSteps.setScreenSize(firstProduct, secondProduct);
    await HomeworkSteps.checkProductDisplay(firstProduct, secondProduct);
    await HomeworkSteps.checkCompareCheckbox(firstProduct, secondProduct);

    // 4. Go to any of selected phone. 
    // Check that parameters same with previous page (OS, screen size, screen dimension, RAM, memory)
    await HomeworkSteps.clickProduct(firstProduct);
    await HomeworkSteps.checkProductInfo(null, null);

    // 5. Click 'Compare' link. 
    // Check that two phones have correct info (described in previous step) and not equal with each other.
    await HomeworkSteps.clickCompareLink();
    await HomeworkSteps.checkProductInfo(null, null);
    await HomeworkSteps.checkProductInfo(null, null);
    await HomeworkSteps.checkProductInfo(null, null, false);

});
