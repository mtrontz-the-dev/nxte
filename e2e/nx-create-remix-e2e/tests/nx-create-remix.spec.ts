import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';
describe('nx-create-remix e2e', () => {
  it('should create nx-create-remix', async () => {
    const plugin = uniq('nx-create-remix');
    ensureNxProject('@nxte/nx-create-remix', 'dist/packages/nx-create-remix');
    await runNxCommandAsync(
      `generate @nxte/nx-create-remix:nx-create-remix ${plugin}`
    );

    const result = await runNxCommandAsync(`build ${plugin}`);
    expect(result.stdout).toContain('Executor ran');
  }, 120000);

  describe('--directory', () => {
    it('should create src in the specified directory', async () => {
      const plugin = uniq('nx-create-remix');
      ensureNxProject('@nxte/nx-create-remix', 'dist/packages/nx-create-remix');
      await runNxCommandAsync(
        `generate @nxte/nx-create-remix:nx-create-remix ${plugin} --directory subdir`
      );
      expect(() =>
        checkFilesExist(`libs/subdir/${plugin}/src/index.ts`)
      ).not.toThrow();
    }, 120000);
  });

  describe('--tags', () => {
    it('should add tags to the project', async () => {
      const plugin = uniq('nx-create-remix');
      ensureNxProject('@nxte/nx-create-remix', 'dist/packages/nx-create-remix');
      await runNxCommandAsync(
        `generate @nxte/nx-create-remix:nx-create-remix ${plugin} --tags e2etag,e2ePackage`
      );
      const project = readJson(`libs/${plugin}/project.json`);
      expect(project.tags).toEqual(['e2etag', 'e2ePackage']);
    }, 120000);
  });
});
