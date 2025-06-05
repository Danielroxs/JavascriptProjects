//const mainUserName = 'Dan';

//const greeting = `Hi there, ${mainUserName}.`;
// Template literal types
type ReadPermissions = 'no-read' | 'read';
type writePermissions = 'no-write' | 'write';

type FilePermissions = `${ReadPermissions}-${writePermissions}`

type DataFile = {
    data: string;
    permissions: FilePermissions;
}

type DataFilesEventNames = `${keyof DataFile}Changed`

type DataFileEvents = {
    [key in DataFilesEventNames]: () => void;
}