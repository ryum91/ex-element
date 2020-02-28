export function camelCaseToDash(myStr: string): string {
  return myStr.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase();
}